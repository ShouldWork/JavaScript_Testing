/**
 * Created by Krysp on 5/18/16.
 */
var numPlayers = 3;
var numHoles = 18;
var myParent = document.getElementById('scoreCard');


function addHoles() {
    "use strict";
    for (var i = 1; i < numHoles; i++ ) {
        var newHole = document.createElement('div');
        var hole = document.createElement('span');
        var holeNumber = i;
        var holeName = 'Hole ' + holeNumber;
        hole.innerHTML = holeName + '<br>';
        hole.style.border = 'solid 1px black';
        hole.style.margin = '20px';
        newHole.style.height = 'auto';
        newHole.style.width = '100px';
        newHole.style.float = 'left';
        newHole.style.margin = '5px';
        newHole.style.border = 'solid 2px black';
        newHole.id = 'hole' + i;
        document.getElementById('scoreCard').appendChild(newHole);
        document.getElementById('hole' + i).appendChild(hole);
        for (var j = 0; j < numPlayers; j++) {
            var player = j + 1;
            var newPlayer = document.createElement('div');
            var playaName = document.createElement('span');
            playaName.innerHTML = 'Player' + player;
            newPlayer.style.height = '20px';
            newPlayer.style.width = 'auto';
            newPlayer.style.background = 'blue';
            newPlayer.style.margin = '5px';
            document.getElementById('hole' + i).appendChild(playaName);
            document.getElementById('hole' + i).appendChild(newPlayer);
            console.log('hole' + i + ' ' + newPlayer);
        }
        
    }
}