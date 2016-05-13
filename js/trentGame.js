/**
 * Created by Krysp on 5/10/16.
 */

var global1;





var newGame =  function (level,name){
    this.level = level;
    this.name = name;
};

var gameContainer = function (width, height, color) {
    this.width = width;
    this.height = height;
    this.background = color;
    var gameArea = document.createElement('div');
    gameArea.width = this.width;
    gameArea.height = this.height;
    gameArea.style.background = this.background;
    document.body.appendChild(gameArea);
};



var myGame = new newGame('Easy','FirstLevel');
var game = new gameContainer(800, 500, 'blue');

// hoisting

