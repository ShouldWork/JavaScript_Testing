/**
 * Created by Krysp on 5/18/16.

 local_obj = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            radius: 100
        }
 get_course(local_obj);
 console.log("Locations: " + local_obj.latitude);
 */





/*
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

 */


//initiate and empty object. This object is populated by the JSON so if you are not using the JSOn
//just yet this won't be needed.     
var testCourse ={};
var closeCourses={}
var xhttp = new XMLHttpRequest();
var xhttpPost = new XMLHttpRequest();
//Cali
//var local_obj = {latitude: 38.860573,longitude: -121.529398,radius: 100}
//Me Utah
var local_obj = {latitude: 40.4426135,longitude: -111.8631116,radius: 10};

function loadMe() {
    $.post("https://golf-courses-api.herokuapp.com/courses",local_obj,function(data,status) {
        closeCourses = JSON.parse(data);
        for (var p in closeCourses.courses){
            var thisCourse = document.createElement('div');
            thisCourse.setAttribute('onclick','getCourseInfo(this.id)')
            thisCourse.setAttribute('id',closeCourses.courses[p].id);
            thisCourse.setAttribute('class','thisCourse');
            thisCourse.style.cursor = 'pointer';
            thisCourse.style.boxShadow = '0 5px 20px 0 rgba(0,0,0,0.80)';
            thisCourse.innerHTML = closeCourses.courses[p].name;
            document.getElementById('selectCourse').appendChild(thisCourse);
            //console.log(closeCourses.courses[p].name);
        }
        document.getElementById('doDiv').style.display = 'block';

    });
};





function getCourseInfo(id) {
//    console.log(id);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            testCourse = JSON.parse(xhttp.responseText);
            buildPage(testCourse.course.hole_count);
            //get_courses(local_obj);
        }
    };
    xhttp.open("GET","https://golf-courses-api.herokuapp.com/courses/" + id,true);
    xhttp.send();
}

/*
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
// build the score card grid
//This builds the hole colums and adds to the columns the column headers.

function buildPage(numHoles) {
    "use strict";
    // calls the course name from the JSON file and adds it to the coursename innerHTML
    //in the DOM
    var choiceTitle = document.getElementById('selectCourse');
    document.getElementById('courseInfo').removeChild(choiceTitle);
    document.getElementById('doDiv').style.display = 'none';
    document.getElementById('addPlayerBtn').style.display = 'block';
    document.getElementById('courseName').innerHTML = testCourse.course.name;
    document.getElementById('theCity').innerHTML += testCourse.course.city + ", " + testCourse.course.state_or_province;
    document.getElementById('phoneNumber').innerHTML += testCourse.course.phone;
    document.getElementById('websiteLink').innerHTML += testCourse.course.name;
    document.getElementById('websiteLink').setAttribute('href',testCourse.course.website);

    // Prepares the column for the players name. This is outside of the for loop
    //This doesn't add any players but creates the column space to be added to later.
    var playerCol = document.createElement('div');
    document.getElementById('scoreCard').appendChild(playerCol);
    playerCol.setAttribute('class','playerCol');
    playerCol.setAttribute('id','playerCol');

    //Create a span element into the Player column. Again this is to prepare the players column
    //I found that this is required to make sure that the player name col. stays in line with the
    //input columns.
    var holeRowTitle = document.createElement('span');
    document.getElementById('playerCol').appendChild(holeRowTitle);
    holeRowTitle.setAttribute('class','playerCol');
    holeRowTitle.innerHTML = 'Hole';

    //Create another span at the par row level.
    var parRowTitle = document.createElement('span');
    document.getElementById('playerCol').appendChild(parRowTitle);
    parRowTitle.setAttribute('class','playerCol');
    parRowTitle.innerHTML = 'Par';


    //This is the for loop that will create the Hole columns.
    for (var j = 0; j < numHoles; j++) {
        //Checks if the column is the '9th' column. This is to add the required break between
        //hole 9 and 10. I have added some styling in the javaScript but really it should
        //be handled in a CSS class.
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

        //Still in the for loop and not the 0th column
        //Prepares the spans that will be inserted as the column headers
        //Hole column header
        var holeColTitleRow = document.createElement('span');
        //Par header
        var holeColParRow = document.createElement('span');
        //This is the actual hole column that everything will be placed into.
        var holeCol = document.createElement('div');
        //Dynamically creates the column ID based on the increment in the for loop. This is crucial
        //to the rest of the code.
        var holeColId = 'column' + j;
        //appends the newly created Hole column to the "Score card" div that was
        //already created in the HTML by the id scorecard
        document.getElementById('scoreCard').appendChild(holeCol);
        //adds the holecol class from the style section in the HTML to the hole column
        holeCol.setAttribute('class', 'holeCol');
        // adds the id to the hole column to be called later when adding players.
        holeCol.setAttribute('id', holeColId);
        //appends the already prepared hole col header to the newly created hole column
        document.getElementById(holeColId).appendChild(holeColTitleRow);
        //applies the class holeColTitleRow to the hole column header
        holeColTitleRow.setAttribute('class', 'holeColTitleRow');
        //writes into the column header the hole numer i.e 1-18
        holeColTitleRow.innerHTML = j + 1;
        //appends to the hole column the already prepared span for the par row.
        //this is a good place to add other static rows that will just be apart of the score card
        //such as yardage or tee boxes etc.
        document.getElementById(holeColId).appendChild(holeColParRow);
        //add the parRowPro class to the par column header span
        holeColParRow.setAttribute( 'class' , 'parRowPro');
        //adds the par number to the innerHTML. This is pulled from the JSON file as an object.
        //The style sheet appends the word "par" to the number with the parRowPro:before selector.
        holeColParRow.innerHTML = testCourse.course.holes[j].tee_boxes[0].par;
        //document.getElementById(outCol).appendChild(outCell);

    }
    setTimeout(function () {
            document.getElementById('addPlayerBtn').click();
        },250
    );


}

//initiate the numPlayers variable. It starts as zero.
var numPlayers = 0;
//Initiate an empty array where players and their properties will be added in the addPlayer() function.
//this function currently is called in the modal add button.
var players = [];
//Function to add players to the score card.



function addTeeBoxes(){
    for (var t in testCourse.course.holes[0].tee_boxes) {
        // console.log(testCourse.course.holes[0].tee_boxes[t]);
        if (!testCourse.course.holes[0].tee_boxes[t].tee_type.includes("auto"))
            document.getElementById('teeDrop').innerHTML += '<option value=\"' + t + '\">' + testCourse.course.holes[0].tee_boxes[t].tee_type.charAt(0).toUpperCase() + testCourse.course.holes[0].tee_boxes[t].tee_type.slice(1) + '</option>'
    }

}
function addPlayer(){
    //get the tee to be used
    //increment the numPlayers variable by one each time the function is ran.

    numPlayers ++;
    var thisPlayer = "player" + numPlayers + "out";
    //Gather the player name from the modal
    var newName = document.getElementById('playerName').value;
    //Gather the level from the modal and get the tee_box type
    var level = document.getElementById('teeDrop').value;
    //gather the handicap from the modal
    var handicap = document.getElementById('handicap').value;
    //Push to the players array an object containing the player name, level, and handicap.
    //not much is written with this just yet other than the name is called again later.
    players.push({name: newName, level: level, handicap: handicap});
    //create a span to place the player name into
    var playerName = document.createElement('span');
    //append the newly created span to the playerName column created in the buildPage function
    document.getElementById('playerCol').appendChild(playerName);
    //add a little class to the player column
    playerName.setAttribute('class','playerCol');
    //add the players name from the array. Because the array is 0 based and the player number
    //doesn't start with 0 the array number is the number of players subtract one.
    //for example to call the first player would be players[0].name etc.
    playerName.innerHTML = players[numPlayers - 1].name;
    //Start a for loop to add the input boxes to the hole column as will continue to run as
    //long as "k" is less the the value in the object
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
        //Create a div to put to hold the par and input for the player
        var scoreParContainer = document.createElement('div');
        //initiate variable for the scoreParContainer id
        var scoreParContainerId = 'player' + numPlayers + 'container' + k;
        //Create an input element for the players score to be added to the hole column
        var holeScoreRow = document.createElement('input');
        //Initiates and assigns the input id i.e "player1scoreCol1 player1scoreCol2 etc.
        var holeScoreRowId = 'player' + numPlayers + 'scoreCol' + k;
        //appends the newly created input element to the hole column by id i.e. column1 column2 etc
        //this is why the for loop is needed here so we can increment the k variable.
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
        //sets the id attribute to the input element created
        holeScoreRow.setAttribute('id', holeScoreRowId);
        //adds some class to the newly created element
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

    //These three lines clears the input boxes used in the modal so when adding another player
    //it starts out blank. Without these lines you will have to manually remove the previous
    //input every time you add a player. 
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