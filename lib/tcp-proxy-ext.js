#!/usr/bin/env node

//----------------------------------------------------------------------
//
// Extention of https://github.com/jcrugzz/tcp-proxy
// 
//----------------------------------------------------------------------
var util = require('util');
var net = require('net')
var tls = require('tls')
var tcpProxy = require('tcp-proxy')
var interpreter = require('command-node');
var Commands = require('./commands');
var connections = {}
var cmds = new Commands(connections);

//---------------------------------------------------------


// ---------------------------------------------------------
function log(s) {
  console.log('\n'+s);
  if (interpreter)
    interpreter.prompt();
}

//---------------------------------------------------------
module.exports = tcpProxy
module.exports.createServer =
module.exports.createProxyServer = function createServer(options) {
  var server = options.ssl
    ? tls.createServer(options.ssl, requestHandler)
    : net.createServer(requestHandler)

  var proxy = tcpProxy(options);
  proxy.on('error', server.emit.bind(server, 'error'))

  function requestHandler(socket) {
    socket.name = socket.remoteAddress + ":" + socket.remotePort
    connections[socket.name] = socket
    log('Client [' + socket.name + '] Connected')
    log('Client Connected. (tot:' + Object.keys(connections).length + ')')

    proxy.proxy(socket, options)

    socket.on('close', function (s) {
      log('Client [' + this.name + '] Disconnected')
      delete connections[this.name]
      log('Client Disconnected. (tot:' + Object.keys(connections).length + ')')
    })
  } 

  interpreter.initialize(cmds.list, 'tcp-blip-' + options.target.port + '> ');

  return server
}

