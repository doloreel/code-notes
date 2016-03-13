// JS LIBRARY

JA = {};

var one23_OBJ = { one: 1, "two": 2, three: 3 };
var one23_ARR = [1, 2, 3];


// MEGA MAP
// takes an array/object and a mapped version of the input array/object
// - dont include prototype properties
//      - use hasOwnProperty to screen out of callback
//      -asd
// - don't let it accept anything other than an array/object
// - get rid of the else statement

// http://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays

var modifyVal = function (val) {
    return val + ' - modified';
}

JA.isPlainObject = function (o) { // FROM STACKOVERFLOW
   return ((o === null) || Array.isArray(o) || typeof o == 'function') ?
          false
          :(typeof o == 'object');
}

JA.MEGAMAP_old = function (collection, callback) {
    var result;
    if (Array.isArray(collection)) {
        result = [];
        for(var i = 0; i < collection.length; i += 1) {
            result.push(callback(collection[i]));
        }
    } else if (JA.isPlainObject(collection)) {
        result = Object.create(null);
        for (var key in collection) {
            result[key] = callback(collection[key]);
        }
    } else {
        console.log('MEGAMAP only accepts Arrays or Objects');
    }
    return result;
};

JA.MEGAMAP = function (collection, callback) {
    var isArray = Array.isArray(collection),
        isObject = ((collection === null) || isArray || typeof collection == 'function') ? false : (typeof collection == 'object'),
        dataType, result;

    // exit out and print error to console if not array or object
    if (!isArray && !isObject) return console.log('MEGAMAP only accepts Arrays or Objects');

    // use Object.create(null) to create an object that does not inherit any prototype
    isArray ? dataType = [] : dataType = Object.create(null);

    // use Object.keys and reduce to operate on both arrays and objects
    result = Object.keys(collection).reduce(function(previous, current) {
        previous[current] = callback(collection[current]);
        return previous;
    }, dataType);

    return result;
};

var returnedObject = JA.MEGAMAP(one23_OBJ, modifyVal);

console.dir(returnedObject);
