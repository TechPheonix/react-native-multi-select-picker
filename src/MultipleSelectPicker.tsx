import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, Text, TouchableWithoutFeedback, Image, TouchableOpacity, ScrollView } from 'react-native'
import styles from './SelectMultiple.styles'
import { mergeStyles } from './mergeStyle'
import ImageAssets from './assets/icons/index'
import SelectMultipleStyles from './SelectMultiple.styles'

const itemType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ label: PropTypes.any, value: PropTypes.any })
])

const styleType = PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
])

const sourceType = PropTypes.oneOfType([PropTypes.object, PropTypes.number])

// A customiseable FlatList that allows you to select multiple rows
export default class MultipleSelectPicker extends Component<any, any> {
    static propTypes = {
        items: PropTypes.arrayOf(itemType).isRequired,
        selectedItems: PropTypes.arrayOf(itemType),

        onSelectionsChange: PropTypes.func.isRequired,
        keyExtractor: PropTypes.func,

        checkboxSource: sourceType,
        selectedCheckboxSource: sourceType,
        renderLabel: PropTypes.func,
        flatListProps: PropTypes.any,
        style: styleType,
        rowStyle: styleType,
        checkboxStyle: styleType,
        labelStyle: styleType,

        selectedRowStyle: styleType,
        selectedCheckboxStyle: styleType,
        selectedLabelStyle: styleType,

        buttonText: PropTypes.string,
        buttonStyle: styleType
    }

    static defaultProps = {
        selectedItems: [],
        style: {},
        rowStyle: {},
        checkboxStyle: {},
        checkboxCheckedStyle: {},
        labelStyle: {},
        checkboxSource: ImageAssets.ic_checkbox,
        selectedCheckboxSource: ImageAssets.ic_checked_checkbox,
        renderLabel: null,
        buttonStyle: {}
    }

    constructor(props) {
        super(props)

        this.state = { dataArray: [], toggle: true }
        this._toggleOff = this._toggleOff.bind(this)
        this._toggleOn = this._toggleOn.bind(this)
    }

    componentDidMount() {
        const rows = this.getRowData(this.props)
        this.setState({ dataArray: rows })
    }

    static getDerivedStateFromProps(props, state) {
        let { items, selectedItems } = props
        items = items.map((obj) => {
            if (Object.prototype.toString.call(obj) === '[object String]') {
                return { label: obj, value: obj }
            } else {
                return { label: obj.label, value: obj.value }
            }
        })
        selectedItems = (selectedItems || []).map((obj) => {
            if (Object.prototype.toString.call(obj) === '[object String]') {
                return { label: obj, value: obj }
            } else {
                return { label: obj.label, value: obj.value }
            }
        })

        items.forEach((item) => {
            item.selected = selectedItems.some((i) => i.value === item.value)
        })

        return { dataArray: items }
    }

    private getRowData({ items, selectedItems }: any) {

        items = items.map(this.toLabelValueObject)
        selectedItems = (selectedItems || []).map(this.toLabelValueObject)

        items.forEach((item) => {
            item.selected = selectedItems.some((i) => i.value === item.value)
        })

        return items
    }

    render() {
        const { dataArray } = this.state
        const { style, flatListProps, keyExtractor } = this.props

        if (this.state.toggle) {

            return (
                <ScrollView>
                    <FlatList
                        style={style}
                        keyExtractor={keyExtractor || this.keyExtractor}
                        data={dataArray}
                        renderItem={this.renderItemRow}
                        {...flatListProps}
                    />
                </ScrollView>
            )

        } else {
            return null
        }

    }

    private onItemPress(row) {
        const { label, value } = row
        let { selectedItems } = this.props

        selectedItems = (selectedItems || []).map(this.toLabelValueObject)

        const index = selectedItems.findIndex((selectedItem) => selectedItem.value === value)

        // tslint:disable-next-line: prefer-conditional-expression
        if (index > -1) {
            selectedItems = selectedItems.filter((selectedItem) => selectedItem.value !== value)
        } else {
            selectedItems = selectedItems.concat({ label, value })
        }
        this.props.onSelectionsChange(selectedItems, { label, value })
    }

    private toLabelValueObject(obj) {
        if (Object.prototype.toString.call(obj) === '[object String]') {
            return { label: obj, value: obj }
        } else {
            return { label: obj.label, value: obj.value }
        }
    }

    keyExtractor = (item, index) => `${index}`

    private renderLabel = (label, style, selected) => {
        if (this.props.renderLabel) {
            return this.props.renderLabel(label, style, selected)
        }
        return (
            <Text style={style}>{label}</Text>
        )
    }

    private renderItemRow = (row) => {
        let {
            checkboxSource,
            rowStyle,
            labelStyle,
            checkboxStyle
        } = this.props

        const {
            selectedCheckboxSource,
            selectedRowStyle,
            selectedCheckboxStyle,
            selectedLabelStyle
        } = this.props

        if (row.item.selected) {
            checkboxSource = selectedCheckboxSource
            rowStyle = mergeStyles(styles.row, rowStyle, selectedRowStyle)
            checkboxStyle = mergeStyles(styles.checkbox, checkboxStyle, selectedCheckboxStyle)
            labelStyle = mergeStyles(styles.label, labelStyle, selectedLabelStyle)
        } else {
            rowStyle = mergeStyles(styles.row, rowStyle)
            checkboxStyle = mergeStyles(styles.checkbox, checkboxStyle)
            labelStyle = mergeStyles(styles.label, labelStyle)
        }

        return (
            <TouchableWithoutFeedback onPress={() => this.onItemPress(row.item)}>
                <View style={rowStyle}>
                    <Image style={checkboxStyle} source={checkboxSource} />
                    {this.renderLabel(row.item.label, labelStyle, row.item.selected)}
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _toggleOn() {
        this.setState({ toggle: true })
    }

    _toggleOff() {
        this.setState({ toggle: false })
    }

}
