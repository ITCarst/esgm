esgm.fn.init({
    modules : [
        'scalability',
        'multiplayer'
    ],
    gameContainer: [
        'game'
    ]
},function(){

    //whole framework is loaded
    var m = this.scalability;

    m.subscribe('game.resize', function(container){
        // set the game ratio 
        var ratio = "3:4";
        
        // get the game
        var gameContainer = document.getElementById('game');
        ratio = ratio.split(":", 2);
        
        // get the size from the SpilGames container
        var width = container.width;
        var height = container.height; 
        
        // calculate the new width / height    
        if(Number(ratio[0]) > Number(ratio[1])){
            
            // ratio width is bigger 
            var calcHeight = (width / Number(ratio[0])) * Number(ratio[1]);
            console.log(calcHeight);
            if(calcHeight > height){
               // recalculate width to match the available height
               var scale = height / calcHeight;
               width = width * scale;
            }else{
               height = calcHeight;
            }   
            
        }else{
            
            // ratio height is bigger 
            var calcWidth = (height / Number(ratio[1])) * Number(ratio[0]);
            if(calcWidth > width){
               // recalculate height to match the available width
               var scale = width / calcWidth;
               height = height * scale;
            }else{
               width = calcWidth;
            } 
        }
        
        // Bitwise round
        width = ~~(width + 0.5);
        height = ~~(height + 0.5);    
        
        // assign new sizes to the game
        gameContainer.style.width = width+"px";
        gameContainer.style.height = height+"px";
        //gameContainer.style.marginTop = ((height/2)*-1)+"px";

    });
});

function dontScroll(event) {
    // Prevent page from elastic scrolling
    event.preventDefault();
}
/*
// handles game resizing with ratio
SpilGames.Events.subscribe('gamecontainer.resize', function(container) {
//function testContainerSize(container){    
	console.log(container)
    // set the game ratio 
    var ratio = "3:4";
    
    // get the game
    var gameContainer = document.getElementById('game');
    ratio = ratio.split(":", 2);
    
    // get the size from the SpilGames container
    var width = container.width;
    var height = container.height; 
    
    // calculate the new width / height    
    if(Number(ratio[0]) > Number(ratio[1])){
        
        // ratio width is bigger 
        var calcHeight = (width / Number(ratio[0])) * Number(ratio[1]);
		console.log(calcHeight);
        if(calcHeight > height){
           // recalculate width to match the available height
           var scale = height / calcHeight;
           width = width * scale;
        }else{
           height = calcHeight;
        }   
        
    }else{
        
        // ratio height is bigger 
        var calcWidth = (height / Number(ratio[1])) * Number(ratio[0]);
        if(calcWidth > width){
           // recalculate height to match the available width
           var scale = width / calcWidth;
           height = height * scale;
        }else{
           width = calcWidth;
        } 
    }
    
    // Bitwise round
    width = ~~(width + 0.5);
    height = ~~(height + 0.5);    
    
    // assign new sizes to the game
    gameContainer.style.width = width+"px";
    gameContainer.style.height = height+"px";
    //gameContainer.style.marginTop = ((height/2)*-1)+"px";
    
});
*/