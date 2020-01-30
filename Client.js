#!/usr/bin/env node
const argv = require('yargs').argv;
const WebSocket = require('ws');

if (argv.num > 9) {
    console.log('This number has two digits.');
} else {
    console.log('This number has one digit.');
}

const ws = new WebSocket('http://localhost:8080/');

ws.on('open', function open() {
  ws.send(argv.num);
});

ws.on('message', (message) => {
  console.log('received: %s', message);
});
