export const numberToHexColor = (numberColor) => {
    return numberColor.toString(16);
};

export const hexToNumber = (hexString) => {
    return parseInt(hexString.substring(1), 16);
}