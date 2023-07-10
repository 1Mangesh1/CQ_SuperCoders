function randomNumberGenerator(min, max) {
    return Math.ceil(Math.random() * (max - min + 1) + min);   

};

module.exports = randomNumberGenerator;

