/**
 * Created by Krysp on 5/26/16.
 */
function truNumber(myNumber) {
    "use strict";
    if (myNumber >= 1 && myNumber <= 20) {
        return true
    } else {
        return false
    }
};

function longString(myString) {
    "use strict";
    if (myString.length <= 5) {
        return true
    } else {
        return false
    }
};

console.log(truNumber(15));
console.log(longString("Something"));


QUnit.test( "hello test", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});