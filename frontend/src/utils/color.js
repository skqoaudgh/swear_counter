export const injectAlphaToColor = (rgbString) => { // 'rgb(255, 99, 132)',
    return rgbString.replace('rgb', 'rgba').replace(')', ', 0.5)');
}