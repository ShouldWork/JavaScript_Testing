/**
 * Created by Krysp on 5/6/16.
 */


var outText = '';
var todayText = '';
var today = new Date();
var monthText = '';
var numDays = 0;
var whatDoes = 'Returns the number of milliseconds since midnight Jan 1, 1970';
var days = 1;
var startTimer = setInterval(timeUpdate,1000);
var dayText = '';

switch (today.getDate()){
    case 1:
        todayText = 'Sunday';
        outText = todayText + ' is not the right answer';
        break;
    case 2:
        todayText = 'Monday';
        outText = 'I\'m sorry you have to be here on a ' + todayText + ':( <--- sad face';
        break;
    case 3:
    case 4:
    case 5:
        outText = 'Just keep waiting you\'ll survive';
        break;
    case 6:
        todayText = 'Friday';
        outText = "It's " + todayText + '!';
        break;
    case 7:
        todayText = 'Saturday';
        outText = 'Why are you here on a ' + todayText + '?';
}


switch (today.getMonth()){
    case 1:
    case 2:
    case 3:
    case 4:
        monthText = 'May';
        numDays = 31;
        break;
    case 5:
        monthText = 'June';
        break;
    default:
        monthText = 'IDK';
}

document.getElementById('resultPlace').innerHTML = outText;
document.getElementById('todayText').innerHTML = todayText;
//document.getElementById('monthText').innerHTML = monthText;



function timeUpdate() {
    today = new Date();
    document.getElementById('clockArea').innerHTML = today.toLocaleTimeString();
}




function readyGo() {
    var userInput = prompt('Do you know what you are doing?');
    switch(userInput) {
        case 'Yes':
            for(var i = 0;i < 12;++i){
                if (i > 6){break;}
                outText += '\nOutput is ' + i;
            }
            break;
        case 'No':
            outText += 'Me either';
            break;
        case 'Maybe':
            outText += 'That doesn\'t sound so confident';
            break;
        default:
            outText += 'Clearly you don\'t though';
    }
    document.getElementById('resultPlace').innerHTML = outText;
}


function makeBoxes() {

   /*
    for (var i = 0; i < numDays; i++){
        days++;
        if (days > 7)
            days = 1;
        switch (days) {
            case 1:
                dayText = 'Sunday';
                break;
            case 2:
                dayText = 'Monday';
                break;
            case 3:
                dayText = 'Tuesday';
                break;
            case 4:
                dayText = 'Wednesday';
                break;
            case 5:
                dayText = 'Thursday';
                break;
            case 6:
                dayText = 'Friday';
                break;
            case 7:
                dayText = 'Saturday';
        }

        var dd = 0;
        for (var w = 0; w<5; w++) {
            var newRow = document.createElement("div");
            newRow.className += 'row';
            newRow.id = 'newRow' + w;
            document.getElementById('calendar-container').appendChild(newRow);
            for (var d = 0; d < 7; d++) {
                dd++;
                var newDay = document.createElement('div');
                newDay.className += 'cell';
                newDay.innerHTML = dd;
                document.getElementById('newRow' + w).appendChild(newDay);
            }
        }
        */
    }


function toUpperArraysync(listOfStrings,callback) {
    //modify the listofStrings
    setTimeout(
        function() {
            for (var k = 0;k < listOfStrings.length; k++) {
                var string = listOfStrings [k];
                listOfStrings[k] = string.toUpperCase();
            }
            // let them now it is ready
            listOfStrings.sort();
            callback(listOfStrings);
        },
        5000
    );
}

function toCapitalize(listOfStrings,callback) {
    setTimeout(
        function() {
            for (var jk = 0; jk < listOfStrings.length; jk++) {
                var s = listOfStrings[jk]


            }
        }
    )
}



var myList = ['meaningful string','even deeper and more meaningful'];
var myCallback = function(modifiedArray) {
    document.getElementById('calendar-container').style.fontSize = '50px';
    for (var kk = 0; kk < modifiedArray.length; kk++){
        document.getElementById('calendar-container').innerHTML += modifiedArray[kk] + '<br><br><br>';
    }
};
toUpperArraysync(myList,myCallback);

