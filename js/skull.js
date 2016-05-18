/**
 * Created by Krysp on 5/18/16.
 */
var skullCount = 0;
function addStuff() {
    "use strict";
    var skulls = document.getElementsByClassName('skull');
    for (var i = 0; i < skulls.length; i++) {
        skulls[i].setAttribute('id','mySkull' + i);
        skulls[i].setAttribute('onclick','removeSkull(this.id)');
        skullCount ++;
        console.log(skulls[i]);
    }
    document.getElementById('counter').value = skullCount;
}


function removeSkull(id) {
    "use strict";
    skullCount --;
    document.getElementById(id).style.transform = 'rotate(360deg)';
        document.getElementById(id).style.opacity = '0';
    document.getElementById('counter').value = skullCount;
}

