export function mergeStyles(defaultStyle, newStyle?, selectedItemStyle?) {
    return Array.prototype.concat.apply([], arguments)
}