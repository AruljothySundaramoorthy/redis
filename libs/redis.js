
const redis = require('redis');

const redisclient = redis.createClient();
redisclient.connect()
redisclient.on('error', function (err) {
    console.log('could not establish a connection with redis. ' + err);
});
redisclient.on('connect', function (err) {
    console.log('connected to redis successfully');
});


module.exports = { redisclient }