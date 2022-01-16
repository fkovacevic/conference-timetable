export const numberToHexColor = (numberColor) => {
    return numberColor.toString(16);
};

export const hexToNumber = (hexString) => {
    const parsedHexStrig = hexString.replace('#', '');
    return parseInt(parsedHexStrig, 16);
}