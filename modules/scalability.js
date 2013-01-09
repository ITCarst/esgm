//scale game acording to screen size
(function(esgm) {

    var mediator = esgm.esgmMediator,
        gameContainer = mediator.getElById(config.gameContainer);

    var scalability = (function(){

        var _priv = {

            subscribe: function(event, callback) {
                mediator.subscribe(event, callback);
            },
            publish: function(event, args) {
                mediator.publish(event, args);
            },
            getSizes: function() {
                var sizes =  mediator.gameSizes();
                return sizes;
            },
            //resize the game based on the height and width
            //publish the game.resize event for each resize of the window to apply the new sizes
            resizeGame: function() {

                var height = window.innerHeight,
                    heightB = window.innerHeight, x;

                setTimeout(function(){
                    window.scrollTo(0, 1);
                    document.body.style.height = (10000)+"px";
                    height  = window.innerHeight;
                    heightB = window.innerHeight;
                }, 100);

                setTimeout(function () {
                    _priv.assignSize(height, heightB);
                }, 230 );
            },
            assignSize: function(height, heightB) {
                var newHeight = window.innerHeight,
                    newWidth = window.innerWidth;
                if(newHeight == 100000) newHeight = heightB; 
                 if(gameContainer.length > 1) {
                    for(var x in gameContainer) {
                        gameContainer[x].style.height = newHeight + "px";    
                    }
                }else {
                    gameContainer.style.height = newHeight + "px";  
                }
                document.body.style.height = newHeight + "px";
                mediator.scalability.publish('game.resize', mediator.scalability.getSizes());                
            },
            //resize the game once loaded
            fitLayoutToScreen: function() {
                setTimeout(function(){
                    if(gameContainer.length > 1) {
                        for(var x in gameContainer) {
                            gameContainer[x].style.height = innerHeight + "px"; // -1px to    
                        }
                    }else {
                        gameContainer.style.height = innerHeight + "px"; // -1px to    
                    }
                    document.body.style.height = innerHeight + "px";
                    mediator.scalability.publish('game.resize', mediator.scalability.getSizes()); 
                }, 20)
            }
        }
        return {
            subscribe: function(event, callback) {
                _priv.subscribe(event, callback)
            },

            publish: function(event, args) {
                _priv.publish(event, args)
            },
            getSizes: function() {
               return _priv.getSizes();
            },
            resizeGame: function() {
                return _priv.resizeGame();
            },
            fitLayoutToScreen: function() {
                return _priv.fitLayoutToScreen();
            }
        };

    }(esgm));
    mediator.scalability = scalability;

    //called once to fit the layout acording to the screen sizes
    mediator.scalability.fitLayoutToScreen();

    //on resize apply the new dimensions to the game
    window.addEventListener('resize', function(){
        if(mediator && mediator.scalability.getSizes()){
            setTimeout(function () { 
                mediator.scalability.resizeGame();
            }, 100 );
        }
    }, false);

}(window.esgm));


/*
        var p, s, width, height;
        if (typeof container != "object" || !container.width) 
        {
            width = window.innerWidth;
            height = window.innerHeight;
            if (Utils.checkSpilgamesEnvironment())
                height -= 25;
            container = {width: width,height: height};
        }
        s = document.getElementById("screen");
        if (!s)
            return;
        if (!s.initWidth) 
        {
            s.initWidth = s.width;
            s.initHeight = s.height;
        }
        width = s.initWidth;
        height = s.initHeight;
        var scale = 1;
        var scaleX = container.width / width;
        var scaleY = container.height / height;
        scale = (scaleX < scaleY ? scaleX : scaleY);
        Utils.globalPixelScale = scale;
        width = Math.floor(width * scale);
        height = Math.floor(height * scale);
        Utils.resizeElement("screen", width, height);
        Utils.resizeElement("screen_background", width, height);
        s = document.getElementById("progress");
        if (s) 
        {
            s.style.width = width + "px";
            s.style.height = height + "px";
        }
        */