# tcp-blip

Built around the awesome **[tcp-proxy](https://github.com/jcrugzz/tcp-proxy)** node package for testing mobile applications. 

Required node packages:
- util
- net
- ip
- tls
- command-node
- tcp-proxy


# Description

A binary proxy that can be used to interactively snip the connections of mobile or desktop applications in order to test their reconnect behavior and strategies. Works for:

- tcp/ip socket 
- websockets 

The proxy has an interactive command line interpreter with a few simple commands:

- "help" : list the existing commands
- "list" : list the active client connections. Identifies them as ip and port.
- "kill <ip:port>" : disconnects a client connection. The ip and port can be obtained using the "list" command.
- Additional commands can be created and added to commands.js. For instance, you might want a command that will cause a lag, etc...


### Usage

Installing Prerequisites
```sh
-- Install Node/NPM (Fedora based systems)
sudo yum install nodejs npm --enablerepo=epel

-- Install Node packages
npm install ip tcp-proxy command-node

```



```sh
node tcp-blip <Local Port> <Remote Host> <Remote Port>
```

# Example:

> Note: You need to hit [Enter] after executing in order for the command prompt to display. Anytime you don't see the command prompt just press enter.

### Startup

```sh
node tcp-blip 8088 74.152.8.48 8080
tcp-blip-8080> tcp-blip Connection Testing Proxy Started
Accepting connections on port: 8088
---

tcp-blip-8080> 
```

### Client Connects

```sh
tcp-blip-8080> 
Client [106.117.63.64:43952] Connected
tcp-blip-8080> 
Client Connected. (tot:1)
tcp-blip-8080> 
```

### The "list" Command

```sh
tcp-blip-8080> list
[key "106.117.63.64:43952"]

1 active connection(s)

tcp-blip-8080> 
```

### Kill a Connection

```sh
Client [106.117.63.64:43952] Disconnected
tcp-blip-8080> 
Client Disconnected. (tot:0)
tcp-blip-8080> 
```



