// Pass in a context to attach our Mediator to. 
// By default this will be the esgm object
(function() {
    var esgm = window.esgm;

    var esgmMediator = (function(){
        var self = this,
            publishedEvents = {},
            subscribers = {};
        var publish = function(event, args) {
            //used in subscribe
            publishedEvents[event] = args;
            if(subscribers[event]){
                subscribers[event](args);
            }
        }
        var subscribe = function(event, callback) {
           /**
            * store the event!! (yes allways)
            */
            subscribers[event] = callback;
            //event is allready published
            if(publishedEvents[event]){
                callback(publishedEvents[event]);
            }
        }
        var unsubscribe = function(event) {
        }
        var gameSizes = function() {
            var domSizes = esgm.fn.dom().getSizes;
            return domSizes;
        }
        var getElById = function(el) {
            var el = esgm.fn.dom().getElById(el);
            return el;
        }   
        var createElem = function(elem, attr, value) {
            
        }
        var connect = function() {
            var multiplayerExtension = esgm.extensions.multiplayer();

            console.log(multiplayerExtension)
        }

        return {
            publish:    publish,
            subscribe:  subscribe,
            unsubscribe: unsubscribe,
            gameSizes:  gameSizes, //returns the sizes of the given game container
            getElById:  getElById, // gets by id one or multiple elements
            createElem: createElem,
            connect:    connect //connects the multiplayer module
        };

    })();
    esgm.esgmMediator = esgmMediator;
    
}());

esgm.esgmMediator.extensions = {
    ajax: function() {
        console.log('ajax')
    },
    json: function() {
        console.log('json')
    }
}