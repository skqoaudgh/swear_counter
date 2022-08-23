export const getRandomRgbColor = () => {
    const round = Math.round;
    const random = Math.random;
    const max = 255;

    return `rgb(${round(random() * max)}, ${round(random() * max)}, ${round(random() * max)})`;
};