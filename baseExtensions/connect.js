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
