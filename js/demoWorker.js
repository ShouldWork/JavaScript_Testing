/**
 * Created by Krysp on 5/20/16.
 */
var i =0;
function timeCount() {
    "use strict";
    i = i + Math.floor((Math.random() * 10) + 1);
    postMessage(i);
    setTimeout('timeCount()',500);
}
timeCount();
