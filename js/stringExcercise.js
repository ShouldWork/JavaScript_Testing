/**
 * Created by Krysp on 5/12/16.
 */

// JavaScript Document
var currentstring = '';

function sendLetter(theletter) {
    var outputcontdiv = document.getElementById("output");
    currentstring += theletter ; // We need to concatenate the strings together.
    checkmyAnswer(currentstring);
    outputcontdiv.innerHTML = currentstring.toLowerCase(); // I want you to make it print to the page in lower case.

}

function checkmyAnswer(instring) {
    if(instring.length === 6){
        document.getElementById("output").innerHTML = "Good Job!<br>";
        document.getElementById('otherOutPut').innerHTML = "You win!<br>" + currentstring.toLowerCase() +  " also contains the word<br>" + instring.substr(2).toLowerCase() + '<br>&<br>' + instring.substr(1).toLowerCase()  ;
    }
}

