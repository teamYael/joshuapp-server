const server = require('../../src/index');
const io = server.socketIO;
const jwt = require('jsonwebtoken');

const socketEvents = require('./socketEvent').socketEvents;

io.use(function (socket, next) {
    if(socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                return next(new Error("Authentication error"));
            }
            socket.decoded = decoded;
            next();
        });
    } else {
        next(new Error("No socket received"));
    }
}).on('connection', socketEvents);

module.exports = io;