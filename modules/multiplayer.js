//scale game acording to screen size
(function(esgm) {

    var mediator = esgm.esgmMediator, ioPort = 8888, w = window.location;
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
                var mRoom = '/multiplayer.room', ////setup default room name
                    url = w.protocol + '//' + w.hostname + ':' + ioPort + mRoom, //url for socket to connect
                    textSet = mediator.getElById(['multiplayer']),
                    joined = false,
                    room = io.connect(url);

                room.on('connect', function() {
                    textSet.innerHTML = 'Connected';
                }); 

                room.on('joined', function(msg) {
                    textSet.innerHTML = msg + 'from server';

                });                

                room.on('message', function(msg) {
                    textSet.innerHTML = msg + 'from server';
                    joined = true;

                });
                room.emit('join room', 'test');
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
