var size = 0;
function LinkedList() {
    this.head = null;
	this.insert = function (element) {
        "use strict";
        if (this.head == null) {
            this.head = element;
        } else {
            var newNode = new Node(element);
            console.log(newNode);
        }
	};
	this.remove = function (element) {

	};
	this.contains = function (element) {
        "use strict";
        find(element,newNode);
    };
	this.size = function () {
        size++;
        console.log(size);
	};
}

function Node(value) {
    this.value = value;
    this.next = null;
}

function find(value,node) {
    "use strict";
    if (node == value) {
        return this.node;
    } else {
        find(value,this.head.next);
    }
    if (node == 'null') {
        return null;
    }
}

