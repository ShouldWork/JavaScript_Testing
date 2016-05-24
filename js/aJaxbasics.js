/**
 * Created by Krysp on 5/23/16.
 */

/*
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    "use strict";
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        document.getElementById('demo').innerHTML = xhttp.responseText;
    }
};
xhttp.open('GET','https://golf-courses-api.herokuapp.com/courses/18300',true);
xhttp.send();

*/


navigator.geolocation.getCurrentPosition(function(position) {
    "use strict";

    var obj = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        radius: 100
    };
    console.log(obj);
    get_courses(obj);


});


function get_courses(obj){
    "use strict";
    $.post('https://golf-courses-api.herokuapp.com/courses', obj, function(data,status){
        "use strict";
        data = JSON.parse(data);
        console.log(data.courses);
        for (var p in data) {
            document.getElementById('demo').innerHTML = data.courses[p];
        }
        //alert("Data: " + data + "\nStatus: " + status);
    });
}

    /*
     var httpPost = new XMLHttpRequest();
httpPost.onreadystatechange = function () {
    if (httpPost.readyState == 4 && httpPost.status == 200) {
        document.getElementById('demo').innerHTML = httpPost.responseText;
    }
};
    httpPost.open('POST','https://golf-courses-api.herokuapp.com/courses',true);
    httpPost.send(obj);
    //document.getElementById('demo').innerHTML = 'Your latitude position is ' + lat + ', Your longitude position is ' + long;
}



/*
$.post('https://golf-courses-api.herokuapp.com/courses', obj, function(data,status){
    "use strict";
    alert("Data: " + data + "\nStatus: " + status);
});
*/
/*
post  /courses
body:
{
    "latitude":
    "longitude":
    "radius":

if (





 */