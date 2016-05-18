/**
 * Created by Krysp on 5/13/16.
 */


var testObject = {
    first: 'First value',
    second: 'Second value',
    third: 'Third value',
    trick: {
        trick1: 'Gotcha!'
    }
};

var testArray = ['Lizard',
    'Spock',
    'Rock',
    'Scissors',
    'Paper'
];





var compareTo = (Math.floor(Math.random() * 10) + 1);

var today = new Date().getDate() + compareTo;
var theMonth = new Date().getMonth();
var theYear = new Date().getYear();

function randomDate(day,month,year) {
    var month = '';
    var day = 0;
    var year = 0;
    if (month == '4'){
        month = 'April';
    }
    return allDate = month + ' ' + day + ' ' + year
}






var user1 = prompt('Pick a number to multiply');

var user2 = prompt('What number to multiply it by?');

var what = prompt('I\'m thinking of a number 1 through 10.\nWhat is it?');

function toCompare(compareTo, what) {
    if (compareTo == what) {
        alert('Nailed it!')
    } else {
        alert('You guessed wrong fool.\nAll your bases are no belong to me!!!')
    }
}



function mutiplyInput(user1, user2) {
    var result = user1 * user2;
    alert ('Oh, btw. The result for your multiplication is\n' + result);
}



toCompare(compareTo,what);
mutiplyInput(user1,user2);
var rDate = randomDate(today,theMonth,theYear);


alert(rDate);


var results = document.getElementById('results');
var first = document.getElementById('first');
var second = document.getElementById('second');
var third = document.getElementById('third');


for (var i=0;i < testArray.length;i++) {
    results.innerHTML += '<br>' + testArray[i] + '<br>'
}

testArray.forEach(function(value,index,objectBack) {
    first.innerHTML += value + '<br>';
});


for (p in testObject) {
        third.innerHTML += '<br>' + p + ' is a ' + typeof p;
}



function toggleMe(id) {
    document.getElementById(id).style.display = 'inline';
    
}



var isHide = document.getElementById('contactInfo').style.display;
if (isHide == 'inline') {
    document.getElementById('contactInfo').style.display = 'none';
} else {
    document.getElementById('contactInfo').style.display = 'inline';
}
