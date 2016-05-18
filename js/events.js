/**
 * Created by Krysp on 5/11/16.
 */

"use strict";
var results = document.getElementById('results');
var first = document.getElementById('first');
var second = document.getElementById('second');
var third = document.getElementById('third');




document.getElementById('results').addEventListener('mousemove',function(mouse) {
    document.getElementById('results').innerHTML = "Y: " + mouse.screenY + " X: " + mouse.screenX;
});

document.getElementById('results').addEventListener('click',function(click) {
    if (click.which == 1){
        var buttonClicked = 'Left button';
    }
    document.getElementById('results').innerHTML += "<BR>" + buttonClicked;
});

document.getElementById('results').addEventListener('mouseleave',function() {
    document.getElementById('results').innerHTML = "Where did you go?!"
});

document.getElementById('first').addEventListener('click',function() {
    document.getElementById('results').innerHTML = target.id;
});

//we make a new promise we promise a numeric count of this promise from

var random = Math.floor((Math.random() * 2) + 1);
if (random == 1) {
    var truth = true;
} else {
    truth = false;
}


function newFunction(truth) {
    return new Promise(
        function (resolve, reject) {
            setTimeout(
                function () {
                    var done = false;
                    if (!done) {
                        reject('This really happened in a bad way')
                    } else {
                        resolve('It appears it worked somehow?!')
                    }
                },
                3500
            )
        }
    );
}


function toUppperArrayAsyncNew(listOfStrings){
    return new Promise(function(resolve,reject){
        if (!Array.isArray(listOfStrings)){
            reject('Failed hard style')
        } else {
            for (var h = 0; h < listOfStrings.length; h++) {
                listOfStrings[i] = listOfStrings[i].toUpperCase();
            }
            resolve(listOfStrings);
        }
    })
}

function firstCharAysncNew(listOfStrings){
    return new Promise(function(resolve,reject){
        if (!Array.isArray(listOfStrings)){
            reject('Failed hard style')
        } else {
            for (var h = 0; h < listOfStrings.length; h++) {
                listOfStrings[i] = listOfStrings[i].charAt(0);
            }
            resolve(listOfStrings);
        }
    })
}


function sortArrayAsyncNew(listOfStrings){
    return new Promise(function(resolve,reject){
        if (!Array.isArray(listOfStrings)){
            reject('Failed hard style')
        } else {
            resolve(listOfStrings.sort());
        }
    })
}





/*
var promise2 = new Promise(
    function(resolve,reject){
        setTimeout(
            function() {
                var done = true;
                if (!done){
                    reject('This really happened in a bad way')
                } else {
                    resolve('It appears it worked somehow?!')
                }
            },
            2500
        )
    }
);
*/

var myNewList = "";
var promiseToUpper = toUppperArrayAsyncNew(myNewList);
var promiseToSort = sortArrayAsyncNew(myNewList);
var promiseFirstChar = firstCharAysncNew(myNewList);


Promise.all(promiseToUpper,promiseToSort,promiseFirstChar).then(function (dataArray) {
    onSuccess(dataArray[0]);
    onSuccess2(dataArray[1]);
});




var onSuccess = function(dataArray) {
    first.style.background = 'green';
    first.innerHTML = message;
};

var onError = function(dataArray) {
    first.style.background = 'red';
    first.innerHTML = message;
};


var onSuccess2 = function(dataArray) {
    second.style.background = 'green';
    second.innerHTML = message;
};

var onError2 = function(dataArray) {
    second.style.background = 'red';
    second.innerHTML = message;
};

var allSuccess = function() {
    third.style.background = 'green';
    third.innerHTML = 'They all succeeded';
};

var someFail = function() {
    third.style.background = 'red';
    third.innerHTML = 'One or more promises were not kept!'
};

