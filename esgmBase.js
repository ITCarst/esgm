//top level private function
(function() {
    
    var self = this;
    var esgm = function() {
        return new esgm.fn.init();
    };
    config = {
        modulesPath :       'modules/',
        baseExtensions :    'baseExtensions',
        mediatorExtensions: 'mediatorExtensions',
        enabledMediator:    false,
        gameContainer:      []
    },
    esgm.fn = {
        init: function(data, callback) {
            var that = this;

            createScripts('esgmMediator.js' , function() {

                config.enabledMediator = true;
                if(config.enabledMediator === true) {
                    if(data && typeof data === 'object') {
                        //check if developer added any of the modules
                        if(data.hasOwnProperty('modules')) {
                            that.requireModules(data.modules, callback);
                        }else{
                            callback.call(esgm.esgmMediator);
                        }
                        if(data.hasOwnProperty('gameContainer')) {
                            var gameID = data.gameContainer, x;
                            if(gameID instanceof  Array) {
                                for(x in gameID) {
                                   config.gameContainer.push(gameID[x]);
                                }
                            }                        
                        }
                    };
                }
            }); 
        },
        requireModules: function(modules, ready) {
            var scope = this;
            scope.total = modules.length;
            scope.currentLoaded = 0;
            for(var x = 0; x < modules.length; x++) {
                createScripts(config.modulesPath + modules[x] + '.js', function() {
                    scope.currentLoaded++;
                    if(scope.currentLoaded === scope.total){
                        ready.call(esgm.esgmMediator);
                    }
                });
            }
        },
        dom: function() {
            return {
                getSizes: getDomSize(),
                getElById: getElById,
                createElem: createElem
            }
        },
        createScripts: function(url, callback) {
            return createScripts(url, callback);
        }
    };
    var createScripts = function(url, callback) {
        var d = document, s ='script', id = url.replace(/modules|.js/i, '');
        var js, fjs = d.getElementsByTagName(s)[0], supportsAsync, calledBack;
        //if script exists don't add it again
        //if (getElById(id)) return;
        //create script
        js = d.createElement(s);
        //support async 
        supportsAsync = js.async === true || "MozAppearance" in d.documentElement.style || window.opera;
        //id us url
        js.id = id;
        //set url
        js.src = url;
        js.onreadystatechange = js.onload = function () {
            var state = js.readyState;
            if (!calledBack && (!state || (supportsAsync ? /complete/ : /loaded|complete/).test(state))) {
                calledBack = true;
                callback.call();
            }
        };
        fjs.parentNode.insertBefore(js, fjs);
    }
    var getDomSize = function() {
        var x, sizes, gameID, elems = config.gameContainer;

        if (typeof elems === 'undefined' || elems === null || elems === '') return;

        gameID = getElById(elems);

        if(gameID.length > 1) {
            for(x = 0; x < gameID.length; x++) {
                sizes = {
                    width: gameID[x].offsetWidth,
                    height: gameID[x].offsetHeight,
                    offsetLeft: gameID[x].offsetLeft,
                    offsetTop: gameID[x].offsetTop,
                    initialHeight: -1
                }        
            }
        }else {
            sizes = {
                width: gameID.offsetWidth,
                height: gameID.offsetHeight,
                offsetLeft: gameID.offsetLeft,
                offsetTop: gameID.offsetTop,
                initialHeight: -1
            }        
        }

        return sizes;
    }
    var getElById = function(elem) {
        var x, elemCollection = [];
        
        if(elem === null || elem === 'undefined') return;

        if(elem.length > 1) {
            for (x in elem ) {
                elemCollection.push(document.getElementById(elem[x]));
            }
        }else {
            elemCollection = document.getElementById(elem);
        }
        return elemCollection;
    }

    var createElem = function(elem, attr, value) {
        var el = document.createElement(elem);
        if(!name || name.constructor != String ) return;
        return el;
    }

    esgm.extensions = { 
        multiplayer : function() {
            
        }       
    }

    window.esgm = esgm; 


})();



//script loader
//object manipulation
//nodejs extenstions
//mongodb extension 
//socketio extension 
//dom manipulation
//browser manipulation
//feature detection
