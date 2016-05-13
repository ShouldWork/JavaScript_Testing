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

function promiseFunction() {
    var random = Math.floor((Math.random() * 2) + 1);
    if (random == 1) {
        var truth = true;
    } else {
        truth = false;
    }
}

function newFunction(truth) {
    var promise = new Promise(
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



var onSuccess = function(message) {
    first.style.background = 'green';
    first.innerHTML = message;
};

var onError = function(message) {
    first.style.background = 'red';
    first.innerHTML = message;
};


var onSuccess2 = function(message) {
    second.style.background = 'green';
    second.innerHTML = message;
};

var onError2 = function(message) {
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


promise.then(onSuccess,onError);

promise2.then(onSuccess2,onError2);


Promise.all([promise2,promise]).then(allSuccess,someFail);
