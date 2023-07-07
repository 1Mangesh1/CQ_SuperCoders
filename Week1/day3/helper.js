function randomnum(max,min){
    return Math.floor(Math.random()*(max-min+1)+min);
}

modules.exports = randomnum;
