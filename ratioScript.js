/**
 * Created by Krysp on 4/29/16.
 */
var start = 1;
var myCard = {fName: 'Blake', lName: 'Locke', akaName: 'Krysp_E', title: 'Noob', manifesto: 'Taking it one step further', img: 'imgres.jpg'};

function fib1() {
    var userEntered = document.getElementById('userInput').value;
    document.getElementById('showMe').innerHTML = fib(userEntered);
}



function fib(n) {
    if (n >= 35) {
        document.getElementById('wowza').innerHTML = 'It\'s too much!';
        return 0;
    } else if (n<= 0) {
        document.getElementById('wowza').innerHTML = '';
        return 0;
    } else if (n<=1) {
        document.getElementById('wowza').innerHTML = '';
        return 1;
    } else if (n === 3) {
        document.getElementById('wowza').innerHTML = '';
        return 2;
    } else {
        document.getElementById('wowza').innerHTML = '';
        return fib(n-2) + fib(n-1);
    }
}

function factorial1() {
    var n = document.getElementById('userInput').value;
    var num = factorial(n);
    document.getElementById('showMe').innerHTML = num;
    if (num>100000000000000) {
        document.getElementById('wowza').innerHTML = 'That\'s a big one!'
    } else {
        document.getElementById('wowza').innerHTML = '';
    }
}



function factorial(n) {
    if (n === 0) {
        return n;
    } else if (n === 1) {
        return n * 1
    } else {
        return n * factorial(n - 1);
    }
}


var car = {manuf: "Pontiac", model: 'Fiero', year: '1987', trim: 'GT', color: 'red', trans: 'Manual', mpg: '28 mpg'};
var gameLevel = {weather: 'dark', speed: 'slow', ai: 'docile'};



function busiCardLoad() {


    document.getElementById('lastName').innerHTML = myCard.lName;
    document.getElementById('akaName').innerHTML = myCard.akaName;
    document.getElementById('title').innerHTML = myCard.title;
    document.getElementById('manifesto').innerHTML = myCard.manifesto;
    /*document.getElementById('logo').src = myCard.img; */
    document.getElementById('myName').innerHTMML = myCard.fName;
    console.log(myCard.fName);

}

function getName() {
    document.getElementById('myName').innerHTML = myCard.fName;
}