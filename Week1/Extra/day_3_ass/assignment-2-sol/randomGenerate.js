
function randomGenerate(start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
}

module.exports = randomGenerate;