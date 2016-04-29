/**
 * Created by Krysp on 4/29/16.
 */
var start = 1;

function fib1() {
    var userEntered = document.getElementById('userInput').value;
    document.getElementById('showMe').innerHTML = fib(userEntered);
}



function fib(n) {
    if (n<= 1) {
        return 0
    } else if (n<=2) {
        return 1
    } else {
        return fib(n-2) + fib(n-1);
    }
}
