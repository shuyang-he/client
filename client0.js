#!/usr/bin/env node
const argv = require('yargs')
.usage('$0 <command> [options]', 'start application')
.command('add', 'add two numbers', (yargs) => {
  yargs.positional('x', {
    default: 0,
    type: 'number'
  }).positional('y', {
    default: 0,
    type: 'number'
  })
})
.command('subtract', 'subtract the second number from the first number', (yargs) => {
  yargs.positional('x', {
    default: 0,
    type: 'number'
  }).positional('y', {
    default: 0,
    type: 'number'
  })
})
.argv;

const WebSocket = require('ws');
const ws = new WebSocket('http://localhost:8080/');

let commandList = ['add', 'subtract'];
let command = argv._[0];
let x = argv.x;
let y = argv.y;

console.log(argv);

if (commandList.find((cmd) => {
  return cmd === command;
}) === undefined) {
  console.log('command not found.');
} else {
  ws.on('open', function open() {
    const obj = {
      command: command,
      x: x,
      y: y
    }
    let buf = Buffer.from(JSON.stringify(obj));
    ws.send(buf);
    // ws.send(x);
    // ws.send(y);
  });
  
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });
}
