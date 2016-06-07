/**
 * Created by Krysp on 6/6/16.
 */
var numHoles = 18;
var d = new Date ();
$(document).ready(function () {
    var cont = $("#container");
    for (var p = 1; p < numHoles + 1; p++) {
        var hole = "<div id='hole" + p + "'>" + p + "</div>";
        cont.append(hole);
        $("#hole" + p).addClass("hole")
    }
    var totalCol = "<div id='totalCol' class='holeCol'>Total</div>";
    var totalCell = "<div id='player1'>0</div>";
    cont.append(totalCol);
    $("#totalCol").append(totalCell); //.addClass("col");
    $("#player1").addClass("hole");
});

function Queue() {
    "use strict";
    this.oldestIndex = 1;
    this.newestIndex = 1;
    this.storage = {}
}

Queue.prototype.size = function(){
    "use strict";
    return this.newestIndex - this.oldestIndex;
};

Queue.prototype.enqueue = function (data) {
    "use strict";
    this.storage[this.newestIndex] = data;
    this.newestIndex++;
};

Queue.prototype.dequeue = function() {
    "use strict";
    var oldestIndex = this.oldestIndex ,
        newestIndex = this.newestIndex ,
        deletedData;

    if (oldestIndex !== newestIndex){
        deletedData = this.storage[oldestIndex];
        delete this.storage[oldestIndex];
        this.oldestIndex++;

        return deletedData;

    }
};

var newQueue = new Queue();
console.log(newQueue);
newQueue.enqueue({name: 'Blake',id: "13", start: d.getSeconds()});
setTimeout(function() {
    "use strict";
    newQueue.enqueue({name: 'Jim',id: "09",start: d.getSeconds()});
},5000);
setTimeout(function() {
    "use strict";
    newQueue.enqueue({name: 'Terry',id: '06',start: d.getSeconds()});
},5000);

console.log(newQueue.dequeue());
