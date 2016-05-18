/**
 * Created by Krysp on 5/17/16.
 */


function Animal(name,color,speak,show) {
    "use strict";
    this.name = (name || 'No Name!!');
    this.color = (color || 'No Color!!');
    this.speak = (speak || 'No Speak!!');
    this.speaking = function() {document.getElementById('results').innerText = (speak || 'Not much')};
    this.showMe = function() {document.getElementById('results').style.backgroundImage = show};
};

function Cat(name,color,speak,show,age) {
    "use strict";
    Animal.call(this,name,color,speak,show);
    this.age = (age || 'No age!!');
    this.show = show;

};

function Bird(name,color,speak,show,age) {
    "use strict";
    Animal.call(this,name,color,speak,show);
    this.age = (age || 'No age!!');
    this.show = show;
};

function Dog(name,color,speak,show,age) {
    "use strict";
    Animal.call(this,name,color,speak,show);
    this.age = (age || 'No age!!');
    this.show = show;
};

function Snake(name,color,speak,show,age) {
    "use strict";
    Animal.call(this,name,color,speak,show);
    this.age = (age || 'No age!!');
    this.show = show;
};

function Lizard(name,color,speak,show,age) {
    "use strict";
    Animal.call(this,name,color,speak,show);
    this.age = (age || 'No age!!');
    this.show = show;
};

function tellMeAbout(someAnimal) {
    "use strict";
    var name = someAnimal.name;
    var color = someAnimal.color;
    var age =someAnimal.age;
    var speak = someAnimal.speak;
    var tellMeWho = name + ' is a ' + color + ' animal that is ' + age + '. Often heard saying ' + speak;
    document.getElementById('bottomText').innerHTML = tellMeWho;
};

Animal.prototype = Object.create(Animal.prototype);
Animal.prototype.constructor = Animal;


var myCat = new Cat('Fluffy','Orange','Meow',"url('../js/cat.JPG/')",12);
var myBird = new Bird('Big Bird','Yellow','Today\'s letter',"url('../js/bird.JPG')",80);
var myDog = new Dog('Fido','Blue','Bark',"url('../js/dog.JPG')",100);
var mySnake = new Snake('Sharecon','Patterned','Hiss',"url('../js/snake.JPG')",100);
var myLizard = new Lizard('Joanna','Green','',"url('../js/Lizard1.jpg')",200);


