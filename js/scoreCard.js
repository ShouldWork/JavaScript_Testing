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
var closeCourses={};
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
            thisCourse.setAttribute('onclick','getCourseInfo(this.id)');
            thisCourse.setAttribute('id',closeCourses.courses[p].id);
            thisCourse.setAttribute('class','thisCourse');
            thisCourse.style.cursor = 'pointer';
            thisCourse.innerHTML = closeCourses.courses[p].name;
            document.getElementById('selectCourse').appendChild(thisCourse);
            //console.log(closeCourses.courses[p].name);
        }
       // document.getElementById('doDiv').style.display = 'block';

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
    vertText("Map");
    $("#slideButton").css("display","block");
    $("#slideWeather").css("display","block").on('click', function() {
        $("#courseContainer").slideUp();
        $("#weatherContainer").slideToggle();
    });
    $("#courseContainer").slideUp();
    $("#courseStats").css("display","block").on('click', function() {
        $("#weatherContainer").slideUp();
        $("#courseContainer").slideToggle();
    }).on('click',courseStats());
    getMyInfo(testCourse.course.zip_code.substr(0,5));
    $("#weatherContainer").css("display","block").slideUp();
    $("#selectCourse").remove();
    //$("#doDiv").css("display","none");
    $("#addPlayerBtn").css("display","block");
    $("#courseName").html(testCourse.course.name);

    $("#theCity").append(testCourse.course.city + ", " + testCourse.course.state_or_province);
    $("#phoneNumber").append(testCourse.course.phone);
    $("#site a").attr("href",testCourse.course.website).text(testCourse.course.name);
    var playerCol = document.createElement('div');
        $("#scoreCard").append(playerCol);
        playerCol.setAttribute('id','playerCol');
        $("#playerCol").attr("class","playerCol");
    var holeRowTitle = document.createElement('span');
        $("#playerCol").append(holeRowTitle);
        holeRowTitle.setAttribute('class','playerCell');
        holeRowTitle.innerHTML = 'Hole';
    var parRowTitle = document.createElement('span');
        $("#playerCol").append(parRowTitle);
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
         //   document.getElementById('addPlayerBtn').click();
            getMapCoord();
            //getMyInfo(84663);
        },250
    );


}
var numPlayers = 0;
var players = [];

function addTeeBoxes(){
    for (var t in testCourse.course.holes[0].tee_boxes) {
        if (!testCourse.course.holes[0].tee_boxes[t].tee_type.includes("auto"))
            document.getElementById('teeDrop').innerHTML += '<option value=\"' + t + '\">' + toCapitalize(testCourse.course.tee_types[t].tee_type) + '</option>'
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
    if (testCourse.course.fees != undefined) {
        $("#courseInfo").append("<img src='../src/images/svg/cash.svg' id='cashButton'>");;
    }
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

function toCapitalize(v) {
    "use strict";
    return v.charAt(0).toUpperCase() + v.slice(1);
}


// Slide stuff

function vertText(textVert){
    document.getElementById("btnTxt").innerHTML ='';
    for (var p = 0; p < textVert.length; p++) {
        document.getElementById("btnTxt").innerHTML += "<span>" + textVert[p] + "</span>"
    }
}
function slideBtn() {
    secondSlidePos = $('#secondSlide').position();
    if (secondSlidePos.left > 0) {
        document.getElementById("slideButton").style.paddingTop = '20px';
        document.getElementById("slideButton").style.height = "75%";
        document.getElementById("firstSlide").style.left = "100%";
        document.getElementById("firstSlide").style.opacity = "0";
        document.getElementById("secondSlide").style.left = "0";
        document.getElementById("secondSlide").style.opacity ="1";
        vertText("Course");
    } else {
        document.getElementById("slideButton").style.paddingTop = '50px';
        document.getElementById("slideButton").style.height = '100%';
        document.getElementById("firstSlide").style.left = '0';
        document.getElementById("secondSlide").style.opacity ="0";
        document.getElementById("secondSlide").style.left = "100%";
        document.getElementById("firstSlide").style.opacity = "1";
        vertText("Map");
    }
}


// Google Map API stuff

var lat = 40.397;
var lng = -111.863;
var map;
function initMap(lat,lng) {
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.397, lng: -111.863},
        scrollwheel: true,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

}


var xhttpMap= new XMLHttpRequest();
var holeLocations = [];

function getMapCoord() {

    for (var g in testCourse.course.holes) {
        // console.log(testCourse.course.holes[g].green_location.lat);
        holeLocations.push({greenLat: testCourse.course.holes[g].green_location.lat, greenLng: testCourse.course.holes[g].green_location.lng,teeLat: testCourse.course.holes[g].tee_boxes[0].location.lat,teeLng: testCourse.course.holes[g].tee_boxes[0].location.lng});
        //  console.log(holeLocations[g].lat + " & " + holeLocations[g].lng);
        document.getElementById("column" + g).setAttribute('onclick','reCenterMap(' + holeLocations[g].greenLat + ',' + holeLocations[g].greenLng + ')');
        console.log("Green: " + holeLocations[g].greenLat + " & " + holeLocations[g].greenLng + "\nTee: " + holeLocations[g].teeLat + " & " + holeLocations[g].teeLng);

    }
    var courseLat = testCourse.course.location.lat;
    var courseLng = testCourse.course.location.lng;
    map.setCenter({lat: courseLat,lng: courseLng});
    reCenterMap(courseLat,courseLng);
}


function reCenterMap(lat,lng) {
    "use strict";
    map.setCenter({lat: lat,lng: lng});
    var marker = new google.maps.Marker({
        position: {lat: lat,lng: lng},
        map: map,
        title: 'Hello World!'
    });
}



//Weather Stuff

//Weather Stuff

//weather API Call
var xhttpWeather;
var weatherObject = {};
var weatherIcon = "../src/images/svg/";

function courseStats() {
    "use strict";
    var addIt = document.getElementById('courseContainer');
    var line = document.createElement("span");
    line.setAttribute('id','statsList');
    var cc = testCourse.course;
    addIt.appendChild(line);
    document.getElementById('statsList').innerHTML += "somethin";
        $("#statsList").html("Membership: " + cc.membership_type + "<br>");
        $("#statsList").append("Holes: " + cc.hole_count + "<br>");
        $("#statsList").append("Global Rank: " + cc.global_rank + "<br>");
        $("#statsList").append("Local Rank: " + cc.local_rank + "<br>");
        $("#statsList").append("Tee Types:<br>");
        for (var g = 0; g < cc.tee_types.length; g++) {
            $("#statsList").append(toCapitalize(cc.tee_types[g].tee_type) + "<br>");
        };
        if (cc.fees != undefined) {
            $("#statsList").append("Fees: " + cc.fees);
        };
};

function getMyInfo(value) {
    xhttpWeather = new XMLHttpRequest();
    xhttpWeather.onreadystatechange = function() {
        if (xhttpWeather.readyState == 4 && xhttpWeather.status == 200) {
            weatherObject = JSON.parse(xhttpWeather.responseText);
            clearWeather();
            $("#cityName").append(weatherObject.name);
            var temperature = weatherObject.main.temp;
            $("#temp").append(temperature.toFixed(0));
            $("#temp img").first().attr("src","../src/images/svg/farenheit.svg");
            $("#wind").append(weatherObject.wind.speed);
            $("#icon img").first().attr("src", weatherIcon + weatherObject.weather[0].icon + ".svg");
            $("#weatherDesc").html(toCapitalize(weatherObject.weather[0].description));
        }

    };
    xhttpWeather.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip="+ value + ",us&appid=a4e12bc54b22227bd03bb03c867242d7&units=imperial", true);
    xhttpWeather.send();
};

function clearWeather() {
    "use strict";
    $("#cityName").html("");
    $("#temp").html("");
    $("#wind").html("");
    $("#icon img").first().attr('src','');
};

function newZip () {
    "use strict";
    var thisZip = $("#zipCode").val();
    getMyInfo(thisZip);
};
//http://api.openweathermap.org/data/2.5/weather?q=London&mode=xml&units=imperial
//api.openweathermap.org/data/2.5/weather?lat=35&lon=139
/*

 Clear Sky 01d
 Few Clouds 02d
 Scattered Clouds 03d
 Broken Clouds 04d
 Shower Rain 09d
 Rain 10d
 Thunderstorm 11d
 Snow 13d
 Mist 50d

 */