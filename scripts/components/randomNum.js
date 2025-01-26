function getRandomInt(min, max) {
    min = Math.ceil(min); // Round up min to nearest integer
    max = Math.floor(max); // Round down max to nearest integer
    return Math.floor(Math.random() * (max - min + 1)) + min; // Inclusive of min and max
}

export { getRandomInt }; // Export the function to be used in other files