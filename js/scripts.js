/**
 * Created by Krysp on 4/27/16.
 */





var addItem = (function() {
    var cartItems = 0;
    return function() {return cartItems++;}
})();

addItem();
console.log(addItem());


var lang_ahk = {pname: 'AHK', level: 'Proficient', scaleNum: 6};
var lang_css3 = {pname: 'CSS3', level: 'Familiar', scaleNum: 3};
var lang_html5 = {pname: 'HTML5', level: 'Familiar', scaleNum: 3};
var lang_javaScript = {pname: 'JavaScript', level: 'Familiar', scaleNum: 3};
var lang_tsql = {pname: 'T-SQL', level: 'Familiar', scaleNum: 4};

var languages = [lang_ahk, lang_css3, lang_html5, lang_javaScript, lang_tsql];


function knownLang(id) {
    for (var i = 0; i < languages.length; i++) {

        if (languages[i].pname === id) {
            var el =  document.getElementById(id)
            var a = el.innerHTML;
            el.innerHTML = a + ' You know how to program in ' + languages[i].pname + '. I would say you are ' + languages[i].level + ' in ' + languages[i].pname + '. I would give it a scale of ' + languages[i].scaleNum + ' out of 10!';
            console.log('You know how to program in ' + languages[i].pname + '. I would say you are ' + languages[i].level + ' in ' + languages[i].pname + '. I would give it a scale of ' + languages[i].scaleNum + ' out of 10!')
        }
    }
}


function colorIt() {
    var getColor = document.getElementById('main-area').style.background;
    var theColor = getColor === 'purple' ? 'green' : 'purple';
    document.getElementById('main-area').style.background = theColor;
}



