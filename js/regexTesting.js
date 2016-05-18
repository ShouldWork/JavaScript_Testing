/**
 * Created by Krysp on 5/16/16.
 */



var myString = 'This is a string that contains something that I am looking for';
var patt = '/contain/i/g';
var search = myString.match(patt);


document.getElementById('results').innerHTML = search;





function searchIt(searchTerm, stringToSearch) {
    var resultContainer = document.getElementById('results');
    resultContainer.innerHTML = stringToSearch.match(searchTerm);
};