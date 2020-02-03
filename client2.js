#!/usr/bin/env node

const argv = require('yargs')
  .usage('$0 <command> [options]', 'start application')
  .command('load', 'load file from server')
  .argv;

const WebSocket = require('ws');
const ws = new WebSocket('http://localhost:8080/');

const fs = require('fs');

const commandList = ['load'];
const command = argv._[0];
const path = argv.path;


if (commandList.find((cmd) => {
  return cmd === command;
}) === undefined) {
  console.log('command not found.');
} else {
  ws.on('open', () => {
    const data = {
      command: command,
      path: path
    };
    const buf = Buffer.from(JSON.stringify(data));
    ws.send(buf);
  });

  ws.on('message', (res) => {
    // const data = JSON.parse(res.toString());
    // console.log(data);
    fs.writeFile('message.txt', res, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  })
}

