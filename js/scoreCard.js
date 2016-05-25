/**
 * Created by Krysp on 5/18/16.

 local_obj = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            radius: 100
        }
 get_course(local_obj);
 console.log("Locations: " + local_obj.latitude);







 if ("geolocation" in navigator) {
 getCoords();
 console.log('I have the navigator option!')
 } else {
 alert("This doesn't exist!")
 }

 function getCoords() {
 console.log('Getting coords');
 navigator.geolocation.getCurrentPosition(function(position) {
 local_obj = {
 latitude: 40.4426135,
 longitude: -111.8631116,
 radius: 100
 }
 show_cords(position.coords.latitude, position.coords.longitude);

 })
 }


 function show_cords(lat,lon) {
 console.log("Latitude position: " + lat + "\nLongitude position: " + lon);
 };

 function get_courses(obj) {
 xhttpPost.onreadystatechange = function () {
 if (xhttpPost.readyState == 4 && xhttpPost.status == 200) {
 console.log(xhttpPost.responseText);
 var closeCourses = JSON.parse(xhttpPost.responseText);
 console.log(closeCourses);
 }
 };
 xhttpPost.open("POST","https://golf-courses-api.herokuapp.com/courses",true);
 xhttpPost.send(obj)
 };

 */

var testCourse ={};
var closeCourses={}
var xhttp = new XMLHttpRequest();
var xhttpPost = new XMLHttpRequest();
//Cali
//var local_obj = {latitude: 38.860573,longitude: -121.529398,radius: 100}
//Me Utah
var local_obj = {latitude: 40.4426135,longitude: -111.8631116,radius: 100};

function loadMe() {
    $.post("https://golf-courses-api.herokuapp.com/courses",local_obj,function(data,status) {
        closeCourses = JSON.parse(data);
        for (var p in closeCourses.courses){
            var thisCourse = document.createElement('div');
            thisCourse.setAttribute('onclick','getCourseInfo(this.id)')
            thisCourse.setAttribute('id',closeCourses.courses[p].id);
            thisCourse.setAttribute('class','thisCourse');
            thisCourse.style.cursor = 'pointer';
            thisCourse.innerHTML = closeCourses.courses[p].name;
            document.getElementById('selectCourse').appendChild(thisCourse);
            //console.log(closeCourses.courses[p].name);
        }
        document.getElementById('doDiv').style.display = 'block';

    });
};





function getCourseInfo(id) {
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            testCourse = JSON.parse(xhttp.responseText);
            buildPage(testCourse.course.hole_count);
        }
    };
    xhttp.open("GET","https://golf-courses-api.herokuapp.com/courses/" + id,true);
    xhttp.send();
}


function buildPage(numHoles) {
    "use strict";
    var choiceTitle = document.getElementById('selectCourse');
    document.getElementById('courseInfo').removeChild(choiceTitle);
    document.getElementById('doDiv').style.display = 'none';
    document.getElementById('addPlayerBtn').style.display = 'block';
    document.getElementById('courseName').innerHTML = testCourse.course.name;
    document.getElementById('theCity').innerHTML += testCourse.course.city + ", " + testCourse.course.state_or_province;
    document.getElementById('phoneNumber').innerHTML += testCourse.course.phone;
    document.getElementById('websiteLink').innerHTML += testCourse.course.name;
    document.getElementById('websiteLink').setAttribute('href',testCourse.course.website);
    var playerCol = document.createElement('div');
    document.getElementById('scoreCard').appendChild(playerCol);
        playerCol.setAttribute('class','playerCol');
        playerCol.setAttribute('id','playerCol');        
    var holeRowTitle = document.createElement('span');
    document.getElementById('playerCol').appendChild(holeRowTitle);
        holeRowTitle.setAttribute('class','playerCell');
        holeRowTitle.innerHTML = 'Hole';
    var parRowTitle = document.createElement('span');
    document.getElementById('playerCol').appendChild(parRowTitle);
        parRowTitle.setAttribute('class','playerCell');
        parRowTitle.innerHTML = 'Par';
    for (var j = 0; j < numHoles; j++) {
        if (j == 9){
            var outCell = document.createElement('div');
            var blankOutCell = document.createElement('div');
            var outCol = document.createElement('div');
            document.getElementById('scoreCard').appendChild(outCol);
                outCol.setAttribute('class', 'holeCol');
                outCol.setAttribute('id', 'outCol');
            document.getElementById('outCol').appendChild(outCell);
                outCell.innerHTML = 'Out';
                outCell.setAttribute('class','outCell');
            document.getElementById('outCol').appendChild(blankOutCell);
                blankOutCell.setAttribute('id' , 'blankOut');
                blankOutCell.setAttribute('class' , 'outCell');
                blankOutCell.innerHTML = '31';
        }
        var holeColTitleRow = document.createElement('span');
        var holeColParRow = document.createElement('span');
        var holeCol = document.createElement('div');
        var holeColId = 'column' + j;
        document.getElementById('scoreCard').appendChild(holeCol);
            holeCol.setAttribute('class', 'holeCol');
            holeCol.setAttribute('id', holeColId);
        document.getElementById(holeColId).appendChild(holeColTitleRow);
            holeColTitleRow.setAttribute('class', 'holeColTitleRow');
            holeColTitleRow.innerHTML = j + 1;
        document.getElementById(holeColId).appendChild(holeColParRow);
            holeColParRow.setAttribute( 'class' , 'parRowPro');
            holeColParRow.innerHTML = testCourse.course.holes[j].tee_boxes[0].par;
    }
    setTimeout(function () {
            document.getElementById('addPlayerBtn').click();
        },250
    );


}
var numPlayers = 0;
var players = [];

function addTeeBoxes(){
    for (var t in testCourse.course.holes[0].tee_boxes) {
        if (!testCourse.course.holes[0].tee_boxes[t].tee_type.includes("auto"))
            document.getElementById('teeDrop').innerHTML += '<option value=\"' + t + '\">' + testCourse.course.holes[0].tee_boxes[t].tee_type.charAt(0).toUpperCase() + testCourse.course.holes[0].tee_boxes[t].tee_type.slice(1) + '</option>'
    }

}
function addPlayer(){
    numPlayers ++;
    var thisPlayer = "player" + numPlayers + "out";
    var newName = document.getElementById('playerName').value;
    var level = document.getElementById('teeDrop').value;
    var handicap = document.getElementById('handicap').value;
    players.push({name: newName, level: level, handicap: handicap});
    var playerName = document.createElement('span');
    document.getElementById('playerCol').appendChild(playerName);
        playerName.setAttribute('class','playerCell');
        playerName.innerHTML = players[numPlayers - 1].name;
    for (var k = 0; k < testCourse.course.hole_count; k++) {
        if (k == 9){
            var outCell = document.createElement('div');
            document.getElementById('outCol').appendChild(outCell);
            outCell.setAttribute('class' , 'outCell');
            outCell.setAttribute('id' , 'player' + numPlayers + 'out');
            outCell.innerHTML = '0';
        }
        var playerLevelPar = document.createElement('div');
        var playerPar = testCourse.course.holes[k].tee_boxes[players[numPlayers - 1].level].yards;
        var scoreParContainer = document.createElement('div');
        var scoreParContainerId = 'player' + numPlayers + 'container' + k;
        var holeScoreRow = document.createElement('input');
        var holeScoreRowId = 'player' + numPlayers + 'scoreCol' + k;
        document.getElementById('column' + k).appendChild(scoreParContainer);
        scoreParContainer.setAttribute('class','scoreParContainer');
        scoreParContainer.setAttribute('id',scoreParContainerId);
        if (testCourse.course.holes[k].tee_boxes[players[numPlayers - 1].level].tee_type == 'men') {
            scoreParContainer.style.color = 'black';
            scoreParContainer.style.border = 'solid 2px black'
        } else {
            scoreParContainer.style.color = 'white';
            scoreParContainer.style.border = 'solid 2px ghostWhite';
        }
        scoreParContainer.style.background = testCourse.course.holes[k].tee_boxes[players[numPlayers - 1].level].tee_hex_color;
        document.getElementById(scoreParContainerId).appendChild(playerLevelPar);
        playerLevelPar.innerHTML = playerPar;
        playerLevelPar.setAttribute('class','playerPar');

        document.getElementById(scoreParContainerId).appendChild(holeScoreRow);
        holeScoreRow.setAttribute('id', holeScoreRowId);
        holeScoreRow.setAttribute('class', 'holeScoreRow');
        holeScoreRow.setAttribute('onchange','updateOut(this.value,\"' + thisPlayer + '\")');
        if (testCourse.course.holes[k].tee_boxes[players[numPlayers - 1].level].tee_type == 'men') {
            console.log(testCourse.course.holes[k].tee_boxes[players[numPlayers - 1].level].tee_type);
            holeScoreRow.style.color = 'black';
            holeScoreRow.style.borderLeft = 'solid 1px black';
        } else {
            holeScoreRow.style.color = 'white';
            holeScoreRow.style.borderLeft = 'solid 1px white';
        }


    } 
    document.getElementById('playerName').value = '';
    document.getElementById('teeDrop').innerHTML = '';
    document.getElementById('handicap').value = '';
}

function updateOut(value,row) {
    "use strict";
    console.log(row);
    var inputValue = document.getElementById(row).innerHTML;
    if (inputValue !=="") {
        document.getElementById(row).innerHTML = Number(value) + Number(inputValue);
    } else {
        document.getElementById(row).innerHTML = value;
    }
}
