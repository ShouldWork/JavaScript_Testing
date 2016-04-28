/**
 * Created by Krysp on 4/28/16.
 */

// JavaScript Document






var addItem = (function() {
    var cartItems = 0;
    return function() {return cartItems++;}
})();

addItem();
console.log(addItem());




// create an array of food items for the monster to eat
var foodarr = ['Carrot', 'Slurpee', 'Candy', 'Purple thing', 'Leonardo Decaprio'];
var currentfood = "Carrot";
var itClicked = 0;
// start the game with a function
function rungame(){
    var thefood = getfood();
    console.log(thefood);
    setfood(thefood);
}

// randomly select a food to put in the box
function getfood(){
    var randomfood = Math.floor((Math.random() * foodarr.length));
    return foodarr[randomfood];
}

// put the food in the box
function setfood(food){
    currentfood = food;
    document.getElementById("foodbox").innerHTML = food;
    $('#foodbox').attr('src', 'carrot.jpg');
}

function eatit(){
    //if the food is good
    itClicked++;
    console.log(currentfood);
    if(currentfood == "Leonardo Decaprio" || currentfood == "Purple thing" || currentfood == "Slurpee"){
        document.getElementById("commentbox").innerHTML = "Good choice, another " + currentfood + " please?!";
        var newFood = getfood();
        setfood(newFood);
        itClicked = 0;
    }
    // if the food is bad
    else{
        if (itClicked > 1) {
            document.getElementById("commentbox").innerHTML = "Stop trying to make me eat it!";
            itClicked++;
            console.log(itClicked);
            if (itClicked > 3) {
                document.getElementById("commentbox").innerHTML = "Fine I'll eat it!";
                newFood = getfood();
                setfood(newFood);
                itClicked = 0;
            }
        }else {
            document.getElementById("commentbox").innerHTML = currentfood + " is terribad";
        }
    }
}

function trashit(){
    //if the food is good
    if(currentfood == "Leonardo Decaprio" || currentfood == "Purple thing" || currentfood == "Slurpee"){
        document.getElementById("commentbox").innerHTML = "Hey! I was going to eat that " + currentfood;
        var newFood = getfood();
        setfood(newFood);

    }
    // if the food is bad
    else{
        document.getElementById("commentbox").innerHTML = "Good call, " + currentfood + " is nasty!";

    }


}

                     