const server = require('../../src/index');
const io = server.socketIO;

const socketEvents = require('./socketEvent').socketEvents;

io.on('connection', socketEvents);

module.exports = io;