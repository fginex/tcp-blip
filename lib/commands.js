// ---------------------------------------------------------
// ---------------------------------------------------------
var connections = {}

function Commands(inConnections) {
  connections = inConnections
}

// ---------------------------------------------------------
// COMMAND HANDLERS
// ---------------------------------------------------------
var listCommandHandler = function() {
  var sb = ''
  var cnt = 0;
  for (var c in connections) {
    sb += '[key "'+c+'"]\n'
    cnt++
  }
  console.log(sb)
  console.log(Object.keys(connections).length+' active connection(s)\n')
}
var killCommandHandler = function(key) {
  if (key >= connections.length) {
    console.log('key not found.')
    return
  }

  if (connections[key]) {
    connections[key].end()
    delete connections[key]    
  }
  else {
    console.log('That socket has already been closed.')
  }
}

// ---------------------------------------------------------
// PUBLIC 
// ---------------------------------------------------------
Commands.prototype.list = {
  'exit': {
      parameters: [],
      description: '\tTerminates the proxy.',
      handler: function() {process.exit(0);}
  },
  'kill': {
      parameters: ['key'],
      description: '\tKills an active websocket connection.',
      handler: killCommandHandler
  },     
  'list': {
      parameters: [],
      description: '\tList active websocket connections.',
      handler: listCommandHandler
  },
  'test': {
      parameters: [],
      description: '\tMisc test.',
      handler: function() {
      }
  }  
};

// ---------------------------------------------------------
// ---------------------------------------------------------
exports = module.exports = Commands;
