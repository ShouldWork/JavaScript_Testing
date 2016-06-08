/**
 * Created by Krysp on 6/7/16.
 */
function LinkedList() {
    this.head = null; 
}

LinkedList.prototype.push = function(val) {
    var node = {
        value: val,
        next: null
    };
    if (!this.head) {
        this.head = node;
    }
    else {
        current = this.head;
        while(current.next){
            current = current.next;
        }
        current.next = node;
    }
};

var myll = new LinkedList();

myll.push(2);
myll.push(10);
myll.push(9);

console.log(myll);
