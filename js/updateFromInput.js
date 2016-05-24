/**
 * Created by Krysp on 5/23/16.
 */


function updateDiv (value) {
    "use strict";
    var inputValue = document.getElementById('result').innerHTML;
    if (inputValue !=="") {
        document.getElementById('result').innerHTML = Number(value) + Number(inputValue);
    } else {
        document.getElementById('result').innerHTML = value;
    }
};