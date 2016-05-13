/**
 * Created by Krysp on 5/4/16.
 */

var ttic = 0;
var colors = ['red','blue','green','yellow','purple','aqua'];
var sizes = [];

var buttons = ['Add Block', 'Remove Block','Remove All'];



function runPage() {
    for (var i = 0; i < buttons.length; i++) {
        document.getElementById('gameBox').innerHTML += '<button id="" onclick="clicked(this.id)">' + buttons[i] + '</button>';
    }
}




function clicked(id) {
    ++ttic;
    if (id == 'NewBlock') {
        var r = Math.floor((Math.random() * 5) +1);
        var h = Math.floor((Math.random() * 255) +50);
        var w = Math.floor((Math.random() * 255) +50);
        var newOne = document.createElement("div");
        newOne.style.width = w + 'px';
        newOne.style.height = h + 'px';
        newOne.style.float = 'left';
        newOne.style.margin = '10px';
        newOne.style.background = colors[r];
        document.getElementById('gameBox').appendChild(newOne);
    } else if (id == 'removeBlock') {
        var gameBox = document.getElementById('gameBox');
        gameBox.removeChild(gameBox.lastChild);
    }

}

