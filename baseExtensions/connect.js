var io = require('socket.io').listen(8888);

var Room = io.of('/room').on('connection', function(socket) {
        
        var joinedRoom = null;
        
        socket.on('join room', function(data) {
            
            socket.join(data);
            
            joinedRoom = data;
            
            socket.emit('joined', "you've joined " + data);
            
            socket.broadcast.to(joinedRoom).send('someone joined room');
            
        }); 

        socket.on('fromclient', function(data) {
            
            if (joinedRoom) {
                
                socket.broadcast.to(joinedRoom).send(data);
            } else {
                
                socket.send("you're not joined a room." + "select a room and then push join.");
            }
        });

    });

/*
var io = require('socket.io').listen(8888);
var clients = {};

//socket has a connection
io.sockets.on('connection', function(socket) { 

    //emited event for setting up the username
    socket.on('set.username', function(username) {
        //set the username
        socket.set('set.username', username, function() {
            //emit new event username set and return the object with the username
            socket.emit('username.set', {username : username});
        })
    })
    //recevied event that game it's connected
    socket.on('game.connect',  function(object) {
        //emit new event that user it's connecteed
        socket.emit('game.connected');
    })

    socket.on('room', function(room) {
        console.log('room set')
        socket.join(room);
    });

    room = 'multiplayer.room';

    io.sockets.in(room).emit('message', 'what is going on, party people?');

    /*
    //receive join.game and create a new room based on user id and room name
    socket.on('join.game', function(room) {

        socket.set('room', room, function() {

            socket.join(room);

            socket.broadcast.to(room).emit('new.user');

            console.log(io.sockets.manager.rooms);

            var clients = io.of('/multiplayer.room').clients();

            
            for(var usersConnected in clients) {

                if(clients[usersConnected] >=3) {


                }
                console.log(clients[usersConnected]);
            }


        });
    });

    //when user disconects close socket
    socket.on('disconnect', function () {
        socket.disconnect();
    });
    
})


/*
var messageExchange = io
    .of('/')
    .on('connection', function (socket) {
        // Set the initial channel for the socket
        // Just like you set the property of any
        // other object in javascript
        socket.channel = "";

        // When the client joins a channel, save it to the socket
        socket.on("game.connect", function (data) {
            socket.channel = data.channel;
        });

        // When the client sends a message...
        socket.on("message", function (data) {
            // ...emit a "message" event to every other socket
            socket.broadcast.emit("message", {
                channel: socket.channel,
                message: data.message
            });
        });
     });

*/

/*// Including libraries
var app = require('http').createServer(handler),


	io = require('socket.io').listen(app),


	static = require('node-static'); // for serving files

var fileServer = new static.Server('./');
	
app.listen(8888);

function handler (request, response) {

	request.addListener('end', function () {
		console.log(response)
        fileServer.serve(request, response);
    });
}

// Listen for incoming connections from clients
io.sockets.on('connection', function (socket) {

	// socket.emit('game.connect', { hello: 'world' });
  	
  	socket.on('game.connect', function (data) {
    
    	console.log(data);
  	
  	});

});
*/