/**
 * Created by Krysp on 5/20/16.
 */
var w;

// Start webWorker
function startWorker() {
    "use strict";
    if(typeof (Worker) !== 'undefined'){
        console.log(typeof Worker);
        if(typeof (w) == 'undefined'){
            console.log(typeof w);
            w = new Worker("../js/demoWorker.js");
        }
        w.onmessage = function(event){
            console.log('event: ' + event);
            document.getElementById('result').innerHTML = event.data;
        };
    }
    else{
        document.getElementById('result').innerHTML = 'It isn\'t supported here';
    }
}

// Stop webWorker
function stopWorker() {
    "use strict";
    w.terminate();
    w = undefined;
}