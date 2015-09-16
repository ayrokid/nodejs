var express      = require( "express"   );
var socket_io    = require( "socket.io" );

// Express
var app          = express();

// Socket.io
var io           = socket_io();
app.io           = io;

// socket.io events
io.on( "connection", function( socket )
{
    console.log( "A user connected" );
});

module.exports = app;