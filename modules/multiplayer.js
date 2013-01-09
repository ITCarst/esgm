//scale game acording to screen size
(function(esgm) {

    var mediator = esgm.esgmMediator;
    var ioPort = 8888;
    var w = window.location;

    var socketIoURL = w.protocol + '//' + w.hostname + ':' + ioPort + '/socket.io/socket.io.js';

    var time = new Date().getTime(),
        userID = Math.round( time * Math.random() );

    var multiplayer = (function() {
        var _priv = {
            subscribe: function(event, callback) {
                mediator.subscribe(event, callback);
            },
            publish: function(event, args) {
                mediator.publish(event, args);
            },
            connect: function(args, callback) {
                
                //setup default room name
                var mRoom = '/multiplayer.room';
                //url for socket to connect
                var url = w.protocol + '//' + w.hostname + ':' + ioPort + mRoom;
                
                var textSet = mediator.getElById(['multiplayer']);


                var joined = false;
                var room = io.connect(url);

                room.on('connect', function() {
                    textSet.innerHTML = 'Connected';
                }); 

                room.on('joined', function(msg) {

                    console.log('joined room ' + msg)

                    textSet.innerHTML = msg + 'from server';

                });                

                room.on('message', function(msg) {

                    textSet.innerHTML = msg + 'from server';
                    joined = true;

                });
                
                room.emit('join room', 'test');


                /*
                var url = w.protocol + '//' + w.hostname + ':' + ioPort,
                    socket = io.connect(url),
                    room = 'multiplayer.room';

                var textSet = mediator.getElById(['multiplayer']);

                //connectig to multipalyer
                socket.on('connecting', function () {
                    textSet.innerHTML = 'Loading...';
                })

                socket.on('connect', function() {
                    
                    textSet.innerHTML = 'Connected';
                    
                    //send the username with comand prompt
                    socket.emit('set.username', prompt('What\s your username?'));

                    //reveive the event with the object holding the username
                    socket.on('username.set', function(username) {
                        if(callback && typeof callback === 'function') {
                            callback();
                        }
                        //send back game connect with the user id and name
                        socket.emit('game.connect', {
                            userID : userID,
                            username: username.username
                        });
                    })

                    socket.on('game.connected', function() {
                        
                        //look for exisitng game
                        socket.emit('room', room);

                        console.log('set room');

                        //join / create

                        //notify user that it's the host or joiner

                        //run game

                        //socket.emit('join.game', 'multiplayer.room');

                    })

                    socket.on('message', function(data) {

                       console.log('Incoming message:', data);

                    });

                })
                */
            }
        }
        return {
            subscribe: function(event, callback) {
                _priv.subscribe(event, callback)
            },

            publish: function(event, args) {
                _priv.publish(event, args)
            },
            connect: function(args, callback) {
                _priv.connect(args, callback);
            }
        };

    }(esgm));

    mediator.multiplayer = multiplayer;

    esgm.fn.createScripts(socketIoURL, function(){})

}(window.esgm));




/*
var clients = {},
    url = w.protocol + '//' + w.hostname + ':' + ioPort,
    socket = io.connect(url);

socket.emit('game.connect', {
    id: userID
});*/