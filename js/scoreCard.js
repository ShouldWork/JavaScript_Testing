/**
 * Created by Krysp on 5/18/16.
 */
var numPlayers = 0;
var numHoles = 18;
var myParent = document.getElementById('scoreCard');


var testCourse ={};
$.getJSON('../js/golf.json',function(data) {
    testCourse=data;
});
setTimeout(function() {
    "use strict";
    alert(testCourse.course.hole_count);
},10000
);



// build the score card grid

function buildPage() {
    "use strict";
    // Build title row
    for (var j = 1; j < numHoles + 1; j++) {
        var holeColTitleRow = document.createElement('span');
        var holeCol = document.createElement('div');
        var holeColId = 'column' + j;
        document.getElementById('scoreCard').appendChild(holeCol);
            holeCol.setAttribute('class', 'holeCol');
            holeCol.setAttribute('id', holeColId);
        document.getElementById('column' + j).appendChild(holeColTitleRow);
            holeColTitleRow.setAttribute('class', 'holeColTitleRow');
            holeColTitleRow.innerHTML = j;
    }
}
function addPlayer(){
    numPlayers ++;
    for (var k = 1; k < numHoles + 1; k++) {
        var holeScoreRow = document.createElement('input');
        var holeScoreRowId = 'scoreCol' + numPlayers;
        document.getElementById('column' + k).appendChild(holeScoreRow);
            holeScoreRow.setAttribute('id', holeScoreRowId);
            holeScoreRow.setAttribute('class', 'holeScoreRow');
    }
}


