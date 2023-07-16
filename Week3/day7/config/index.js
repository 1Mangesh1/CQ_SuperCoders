const dev = require('./dev');
const prod = require('./prod');

var config;

if (process.env.NODE_ENV === 'production') {
  config = prod;
}
if (process.env.NODE_ENV === 'development') {
    config = dev;
    }

    if(!config) {
        throw new Error('No config set');
    }

module.exports = config;
