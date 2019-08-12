import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import MultipleSelectPicker from './src/MultipleSelectPicker'

export default class App extends React.Component<any, {}> {
    state = {
        selectectedItems: [],
        isShownPicker: false
    }
    multiSelect

    render() {
        const items = [
            { label: 'itachi', value: '1' },
            { label: 'kakashi', value: '2' },
            { label: 'madara', value: '3' },
            { label: 'menato', value: '4' },
            { label: 'naruto', value: '5' },
            { label: 'hinata', value: '6' },
            { label: 'jiraya', value: '7' },
            { label: 'tsunade', value: '8' },
            { label: 'naruto', value: '9' },
            { label: 'sasuke', value: '10' },
            { label: 'hashirama', value: '11' },
            { label: 'tobirama', value: '12' },
            { label: 'pain', value: '13' },
            { label: 'sarada', value: '14' },
            { label: 'sakura', value: '15' },
            { label: 'asura', value: '16' },
            { label: 'indra', value: '17' }
        ]
        const renderLabel = (label, style) => {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 42, height: 42 }} source={{ uri: 'https://dummyimage.com/100x100/52c25a/fff&text=S' }} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={style}>{label}</Text>
                    </View>
                </View>
            )
        }
        return (
            <ScrollView>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({ isShownPicker: !this.state.isShownPicker })
                    }}
                    style={{ height: 50, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#dadde3' }}
                >
                    <Text>Picker</Text>
                </TouchableOpacity>
                {this.state.isShownPicker ? <MultipleSelectPicker
                    items={items}
                    onSelectionsChange={(ele) => { this.setState({ selectectedItems: ele }) }}
                    selectedItems={this.state.selectectedItems}
                    buttonStyle={{ height: 100, justifyContent: 'center', alignItems: 'center' }}
                    buttonText='hello'
                    checkboxStyle={{ height: 20, width: 20 }}
                />
                    : null
                }

                {(this.state.selectectedItems || []).map((item: any, index) => {
                    return <Text key={index}>
                        {item.label}
                    </Text>
                })}

            </ScrollView >
        )
    }
}
