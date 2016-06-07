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
var response={};
//Cali
//var local_obj = {latitude: 38.860573,longitude: -121.529398,radius: 100}
//Me Utah
var local_obj = {latitude: 40.4426135,longitude: -111.8631116,radius: 100};

$(document).ready(function() {
    "use strict";
    $.ajax("https://golf-courses-api.herokuapp.com/courses", {
        type: "POST",
        success: function(response){
            response = JSON.parse(response);
            for (var p in response.courses){
                var thisCourse = "<div id='" + response.courses[p].id + "' class='thisCourse' onclick='getCourseInfo(this.id)'>" + response.courses[p].name + "</div>";
                $("#selectCourse").append(thisCourse);

            }
            $("#doDiv").show();
        },
         error: function (request,errorType,errorMessage){
            $("#selectCourse").append(errorMessage);
         },
         timeout: 3000,
         beforeSend: function(){
            $("#selectCourse").append("<img src='../src/images/svg/golfClub.svg' class='is-loading' id='golfLoading'>");
            $("#golfLoading").animate({"transform": "rotate(360deg"},'fast');
         },
         complete: function(){
            $("#golfLoading").remove();
         },
         data: {"latitude": 40.4426135,"longitude": -111.8631116,"radius": 100}
    });
});

var numHoles;
function getCourseInfo(id) {
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            testCourse = JSON.parse(xhttp.responseText);
            numHoles = testCourse.course.hole_count;
            buildPage(numHoles);
        }
    };
    xhttp.open("GET","https://golf-courses-api.herokuapp.com/courses/" + id,true);
    xhttp.send();
}


function buildPage(numHoles) {
    "use strict";
    vertText("Map");
    var scC = $("#scoreCard");
    $("#slideButton").css("display","block");
    $("#slideWeather").css("display","block").hover( function() {
        $("#weatherContainer").slideToggle();
    });
    $("#courseContainer").slideUp();
    $("#courseStats").css("display","block").hover( function() {
        $("#courseContainer").slideToggle();
    }).on('click',courseStats());
    //getMyInfo(testCourse.course.zip_code.substr(0,5));
    getMyInfo();
    $("#selectCourse").remove();
    //$("#doDiv").css("display","none");
    $("#addPlayerBtn").css("display","block");
    $("#courseName").html(testCourse.course.name);
    $("#newCourse").css("display","block");
    $("#theCity").append(testCourse.course.city + ", " + testCourse.course.state_or_province);
    $("#phoneNumber").append(testCourse.course.phone);
    $("#site a").attr("href",testCourse.course.website).text(testCourse.course.name);

    var playerCol = "<div id='playrCol' class='playerCol'></div>";
        scC.append(playerCol);
    var holeRowTitle = "<div class='playerCell'>Hole</div>";
        $("#playerCol").append(holeRowTitle);
    var parRowTitle = "<span class='playerCell'>Par</span>";
        $("#playerCol").append(parRowTitle);
    for (var j = 0; j < numHoles; j++ ) {
        if (j == 9){
            var outCell = "<div class='outCell'>Out</div>",
                outCol = "<div class='holeCol' id='outCol'></div>",
                blankOutCell = "<div id='blankOut' class='outCell'>31</div>";
            scC.append(outCol);
            $("#outCol").append(outCell).append(blankOutCell);
        }
        var holeColTitleRow = "<span class='holeColTitleRow'>" + j + "</span>",
            holeColId = 'column' + j,
            holeColParRow = "<span class='parRowPro'>" + testCourse.course.holes[j].tee_boxes[0].par + "</span>",
            holeCol = "<div id='" + holeColId + "' class='holeCol'></div>";
        scC.append(holeCol);
        $("#" + holeColId).append(holeColTitleRow).append(holeColParRow);
    }
    var totalCol = "<div id='totalColumn' class='holeCol'></div>";
    $("#totalColumn").append(outCell);
    scC.append(totalCol);
    setTimeout(function () {
            getMapCoord();
        },250
    );
}
var numPlayers = 0;
var players = [];

function addTeeBoxes(){
    //testCourse.course.holes[k].tee_boxes[players[numPlayers - 1].level].tee_type
    for (var t in testCourse.course.holes[0].tee_boxes) {
        var teeType = testCourse.course.holes[t].tee_boxes[t].tee_type;
        if (!teeType.includes("auto")) {
            var teeBox = toCapitalize(teeType);
            document.getElementById('teeDrop').innerHTML += '<option value=\"' + t + '\">' + teeBox + '</option>';
            //console.log("tee: " + teeBox + " option: " + t);
        }
    }
}

function newCourse() {
    window.location.reload();
}

function addPlayer(){
    numPlayers ++;
    var level = $("#teeDrop").val(); //document.getElementById('teeDrop').value ,
    players.push({name: newName, level: level, handicap: handicap});
    var thisPlayerOut = "player" + numPlayers + "out",
        thisPlayer = "player" + numPlayers,
        newName = $("#playerName").val(),  // document.getElementById('playerName').value,
        handicap = $("#handicap").val(), //document.getElementById('handicap').value,
        playerName ="<span class='playerCell'>" + players[numPlayers -1].name + "</span>";

    $("#playerCol").append(playerName);
    for (var k = 0; k < testCourse.course.hole_count; k++) {
        if (k == 9){
            var outCell = "<div class='outCell' id='player" + numPlayers + "out'>0</div>";
            $("#outCol").append(outCell);
        }
        var playerPar = testCourse.course.holes[k].tee_boxes[players[numPlayers - 1].level].yards,
            playerOut = "player" + numPlayers,
            playerLevelPar = "<div class='playerPar'>" + playerPar + "</div>",
            scoreParContainerId = 'player' + numPlayers + 'container' + k,
            scoreParContainer = "<div class='scoreParContainer' id='" + scoreParContainerId + "'></div>",
            holeScoreRowId = 'player' + numPlayers + 'scoreCol' + k,
            teeColor = testCourse.course.holes[k].tee_boxes[players[numPlayers - 1].level].tee_hex_color,
            holeScoreRow = "<input class='holeScoreRow' id='" + holeScoreRowId + "'>",
            teeType = testCourse.course.holes[k].tee_boxes[players[numPlayers - 1].level].tee_type;
        console.log(teeColor);
        $("#column" + k).append(scoreParContainer);
        if (testCourse.course.holes[k].tee_boxes[players[numPlayers - 1].level].tee_type == 'men') {
            $("#" + scoreParContainerId).css({"color": "black", "border": "solid 2px black"});
        } else {
            $("#" + scoreParContainerId).css({"color": "white", "border": "solid 2px ghostWhite"});
        }
        $("#" + scoreParContainerId).css("background-color",teeColor);
       // scoreParContainer.style.background = testCourse.course.holes[k].tee_boxes[players[numPlayers - 1].level].tee_hex_color;
        $("#" + scoreParContainerId).append(playerLevelPar).append(holeScoreRow);
        $("#" + holeScoreRow).attr("onkeyup","update()");
        if (teeType == 'men') {
            $("#" + holeScoreRowId).css({"color": "black","border": "solid 2px white"});
        } else {
            $("#" + holeScoreRowId).css({"color": "ghostWhite","border": "solid 2px black"});
        }
    }
    $("#playerName").val('');
    $("#teeDrop").html('');
    $("#handicap").val('');
}

function updateOut(player,row) {
    "use strict";
    var outScore = 0;
    for (var pt = 0; pt < numHoles; pt++) {
        var ptc = player + "scoreCol" + pt;
        var score = Number(document.getElementById(ptc).value);
        if (score != '') {
            outScore += score;
        }
    }
    document.getElementById(row).innerHTML = outScore;
};

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
    $("#statsList").html("Membership: " + toCapitalize(cc.membership_type) + "<br>");
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


function getMyInfo() {
    var zipCode = $("#zipCode").val();
    $.ajax('http://api.openweathermap.org/data/2.5/weather', {
        success: function(response) {
            var windSpeed = Math.ceil(response.wind.speed);
            clearWeather();
            $("#cityName").append(response.name);
            var temperature = response.main.temp;
            $("#humidity").append(response.main.humidity);
            $("#temp").append(temperature.toFixed(0));
            $("#temp img").first().attr("src","../src/images/svg/farenheit.svg");
            $("#wind").append(windSpeed);
            if (windSpeed > 0 && windSpeed <= 12 ) {
                $("#wind img").attr('src','../src/images/svg/wind-3.svg')
            } else if (windSpeed > 12 && windSpeed <= 18) {
                $("#wind img").attr('src','../src/images/svg/wind-4.svg')
            } else if (windSpeed > 18) {
                $("#wind img").attr('src','../src/images/svg/weather-1.svg')
            }
            $("#icon img").first().attr("src", weatherIcon + response.weather[0].icon + ".svg");
            $("#weatherDesc").html(toCapitalize(response.weather[0].description));
        },
        data: {"zip": testCourse.course.zip_code.substr(0,5) ,"appid": "a4e12bc54b22227bd03bb03c867242d7","units": "imperial"},
        error: function (request,errorType,errorMessage){
            $("#cityName").append(errorMessage);
        },
        timeout: 3000,
        beforeSend: function(){
            $("#slideWeather").css({"background-color": "red","color": "black"})
        },
        complete: function(){
            $("#slideWeather").css({"background-color": "transparent", "color": "ghostWhite"})
        }
    });
}


function clearWeather() {
    "use strict";
    $("#weatherContainer > div").not('#icon').html('');
    $('#temp img').append('img src="../src/images/svg/farenheit.svg"');
    $("#icon img").attr('src','');
}

function newZip () {
    "use strict";
    var thisZip = $("#zipCode").val();
    getMyInfo(thisZip);
};
/*
 //weather API Call
 var xhttpWeather;
 var weatherObject = {};
 var weatherIcon = "../src/images/svg/";
 $(document).ready(function () {
 $("#slideWeather").on('click',function() {
 "use strict";
 $("#weatherContainer").slideToggle('fast',"swing");
 });
 });

 function getMyInfo() {
 var zipCode = $("#zipCode").val();
 $.ajax('http://api.openweathermap.org/data/2.5/weather', {
 success: function(response) {
 clearWeather();
 $("#cityName").append("<h1>" + response.name + "</h1>");
 $("#temp").append("<span>" + Math.ceil(response.main.temp) + "</span>");
 $("#temp img").attr("src","../src/images/svg/farenheit.svg");
 $("#wind").html("<span>" + response.wind.speed + "<span>");
 $("#cityName").append("<h4>" + response.weather[0].description + "</h4>");
 $("#icon img").first().attr("src", weatherIcon + response.weather[0].icon + ".svg");
 },
 data: {"zip": zipCode,"appid": "a4e12bc54b22227bd03bb03c867242d7","units": "imperial"},
 error: function (request,errorType,errorMessage){
 $("#cityName").append(errorMessage);
 },
 timeout: 3000,
 beforeSend: function(){
 $("#slideWeather").css({"background-color": "red","color": "black"})
 },
 complete: function(){
 $("#slideWeather").css({"background-color": "rgba(0,0,0,0.80)", "color": "ghostWhite"})
 }
 });
 }


 function clearWeather() {
 "use strict";
 $("#weatherContainer > div").not('#icon').html('');
 $('#temp img').append('img src="../src/images/svg/farenheit.svg"');
 $("#icon img").attr('src','');
 }
 */