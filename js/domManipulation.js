/**
 * Created by Krysp on 5/18/16.
 */


setTimeout(function() {
    "use strict";

    $('#container').css('background-color','aqua').height('500px').width('500px').css('border','solid 2px black');

},2500
);


setTimeout(function() {
    "use strict";
        $( ".box" ).css( "border", "5px solid green" ).css('padding','50px').css('margin','10px');
    /*
    var elements = document.getElementsByClassName('box');
    for (var i = 0; i < elements.length;i++) {
        elements[i].innerHTML = 'Some link';
*/
},4500
);

setTimeout(function() {
    "use strict";
        $('.<a>').css('background-color','red'); //toLocaleLowerCase();
    /*
    var elClass = document.getElementsByClassName('box');
    for (var j = 0; j < elClass.length; j++) {
        elClass[j].style.height = '100px';
        elClass[j].style.width = '150px';
        elClass[j].style.background = 'red';
    }
*/
},3500
);


setTimeout(function() {
    "use strict";
    var imgClass = document.getElementsByTagName('img');
    for (var k =0; k < imgClass.length; k++) {
       imgClass[k].setAttribute('src','../js/cat.JPG');
        console.log(imgClass[k]);
    }
},5500
);
