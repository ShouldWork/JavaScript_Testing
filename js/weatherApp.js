
/**
 * Created by Krysp on 6/1/16.
 */

//Weather Stuff

//weather API Call
var xhttpWeather;
var weatherObject = {};
var weatherIcon = "../src/images/svg/";
$(document).ready(function () {
    //  getMyInfo(84660);
    /*
     $("#zipCode").keyup(function(event){
     if(event.keyCode == 13){
     $("#getWeather").click();
     }
     });
     */
    $("#weatherContainer").slideUp();
    $("#slideWeather").on('click',function() {
        "use strict";
        $("#weatherContainer").slideToggle('fast',"swing");
    });

});

/*
 function getMyInfo(value) {
 console.log($("#zipCode").val());
 xhttpWeather = new XMLHttpRequest();
 xhttpWeather.onreadystatechange = function() {
 if (xhttpWeather.readyState == 4 && xhttpWeather.status == 200) {
 weatherObject = JSON.parse(xhttpWeather.responseText);
 console.log(weatherObject);
 clearWeather();
 $("#cityName").append(weatherObject.name);
 $("#temp").append(weatherObject.main.temp);
 $("#temp img").attr("src","../src/images/svg/farenheit.svg");
 $("#wind").html(weatherObject.wind.speed);
 $("#icon img").first().attr("src", weatherIcon + weatherObject.weather[0].icon + ".svg");
 }

 };
 xhttpWeather.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip="+ value + ",us&appid=a4e12bc54b22227bd03bb03c867242d7&units=imperial", true);
 xhttpWeather.send();
 };

 */
function getMyInfo() {
    var zipCode = $("#zipCode").val();
    $.ajax('http://api.openweathermap.org/data/2.5/weather', {
        success: function(response) {
            console.log(response);
            $("#cityName").append("<span>" + response.name + "</span>");
            $("#temp").append("<span>" + response.main.temp + "</span>");
            $("#temp img").attr("src","../src/images/svg/farenheit.svg");
            $("#wind").html("<span>" + response.wind.speed + "<span>");
            $("#icon img").first().attr("src", weatherIcon + response.weather[0].icon + ".svg");
        },
        data: {"zip": $("#zipCode").val(),"appid": "a4e12bc54b22227bd03bb03c867242d7","units": "imperial"}
    });
}


function clearWeather() {
    "use strict";
    $("#weatherContainer > div").not('#icon').html('');
    $('#temp img').append('img src="../src/images/svg/farenheit.svg"');
    $("#icon img").attr('src','');
    // $("#cityName").html("");
    //$("#temp").html("");
    //$("#wind").html("");
    //$("#icon img").first().attr('src','');
}
/*
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
