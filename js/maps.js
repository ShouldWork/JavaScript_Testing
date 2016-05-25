
var local_obj = {latitude: 40.4426135,longitude: -111.8631116,radius: 100};


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

//Street View AIzaSyDBpmm_TC4XFThsW4anGUk6AQfzSsP2re4

/*
 <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBYX6y-RZJ7AshNcPrjlUghJRZzbH8DqEM&callback=initMap"
 async defer></script>
 */



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



var xhttp = new XMLHttpRequest();
var holeLocations = [];

function getCourseInfo(id) {
//    console.log(id);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            testCourse = JSON.parse(xhttp.responseText);
            for (var g in testCourse.course.holes) {
               // console.log(testCourse.course.holes[g].green_location.lat);
                holeLocations.push({greenLat: testCourse.course.holes[g].green_location.lat, greenLng: testCourse.course.holes[g].green_location.lng,teeLat: testCourse.course.holes[g].tee_boxes[0].location.lat,teeLng: testCourse.course.holes[g].tee_boxes[0].location.lng});
              //  console.log(holeLocations[g].lat + " & " + holeLocations[g].lng);
                var holeBtn = document.createElement('button');
                    holeBtn.innerHTML = g;
                    holeBtn.setAttribute('onclick','reCenterMap(' + holeLocations[g].greenLat + ',' + holeLocations[g].greenLng + ')');
                    document.getElementById('holesContainer').appendChild(holeBtn);
                console.log("Green: " + holeLocations[g].greenLat + " & " + holeLocations[g].greenLng + "\nTee: " + holeLocations[g].teeLat + " & " + holeLocations[g].teeLng);

            }
            //var greenLat = testCourse.course.holes[0].green_location.lat;
            //var greenLng = testCourse.course.holes[0].green_location.lng;
            var courseLat = testCourse.course.location.lat;
            var courseLng = testCourse.course.location.lng;
            //console.log("Green Lat: " + greenLat + "\nWhich is a " + typeof greenLat + "\nGreen Lng: " + greenLng + "\nWhich is a " + typeof greenLng);
            //get_courses(local_obj);
            //map.setCenter({lat: -34, lng: 151});
            map.setCenter({lat: courseLat,lng: courseLng});
           // initMap(courseLat,courseLng);

        }
    };
    xhttp.open("GET","https://golf-courses-api.herokuapp.com/courses/" + id,true);
    xhttp.send();
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
