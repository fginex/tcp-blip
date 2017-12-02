#!/usr/bin/env node

/*
 *
 */
var LOCAL_PORT  = process.argv[2]
var REMOTE_HOST = process.argv[3]
var REMOTE_PORT = process.argv[4]

var ip = require('ip')
var tcpProxyExt = require('./lib/tcp-proxy-ext')

if (process.argv.length < 5) {
	console.log("node tcp-blip <Local Port> <Remote Host> <Remote Port>")
	process.exit()
}

var server = tcpProxyExt.createServer({target: {
        host: REMOTE_HOST,
        port: REMOTE_PORT
    }
  })
 
server.listen(LOCAL_PORT)

console.log('tcp-blip Connection Testing Proxy Started')
console.log('Accepting connections on port: ' + server.address().port)
