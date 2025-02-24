'use strict'

/*
slice is the same as strings, but notice that slice(a, b): 
The position of the representative of a must be in front of the position of the representative of b.

Splice is used in the similar way as slice, but has a few diffences, and it has more parameters.
splice(start, deleteCount, item1, item2, ...)
*/
const testArr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(testArr1.splice(-1), testArr1);
const testArr2 = [1, 2, 3, 4, 5];
testArr2.splice(2, 0, 'a', 'b'); // insert
console.log(testArr2); // [1, 2, 'a', 'b', 3, 4, 5]
const testArr3 = [1, 2, 3];
console.log(testArr3.reverse(), testArr3);
// Even though testArr1/2/3 was defined as const, it still changed.
console.log(testArr3.concat([4, 5, 6]), testArr3);// but testArr3 is not changed here, still [3, 2, 1].
console.log(testArr3.join(','), testArr3);// 3,2,1 [ 3, 2, 1 ]
console.log(testArr3.at(-1));// at also can be used in strings.

// forEach: parameter order: value, index, array.
const movements = [200, 450, -400, 3000, -650];
movements.forEach(function (mov, i, arr) {
    if (mov > 0) {
        console.log(`Movement ${i + 1}: You deposited ${mov}`);
    } else {
        console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
    }
});

// for map and set: parameter order: value, key, map; value, value, set(NOTICE set).

// map mathod is similar to forEach, but it returns a new array. So NOTICE return should be written.
// what should be returned: for value, not for arr.

// filter method: Literal, but also returns an array(also need return)
const deposits = movements.filter(function (mov, i, arr) {
    return mov > 2;// NOTICE THE GRAMMAR
});
console.log(deposits);// [ 200, 450, 3000 ]

// reduce: acc and cur: acc is the return value of the previous iteration, cur is the current iteration.
const twos = [2, 2, 2, 2, 2];
const two_power = twos.reduce((acc, cur) => acc * cur, 1);
console.log(two_power);
// acc can be arrays and any types, it's up to programmer to decide
const arrAcc = testArr1.reduce((acc, cur) => {
    (cur >= 5) && (acc[0] *= cur) || (acc[1] *= cur);
    return acc;
}, [1, 1]);
console.log(arrAcc);// [ 15120, 24 ]

// find methods is similar to filter, but only return the first element that satisfies the condition.
console.log(testArr1.find(el => el >= 5));
console.log(testArr1.findIndex(el => el >= 5));
console.log(testArr1.lastIndexOf(5))// lastIndexOf don't recevie callback function.

console.log(testArr1.some(el => el >= 5));// true
console.log(testArr1.every(el => el >= 5));// false

const testArr4 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
console.log(testArr4.flat());// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
const testArr5 = [[1, [2, 3]], 4, [5, [6, 7]]];
console.log(testArr5.flat());
console.log(testArr5.flat(2));// the parameter is the depth of the array

const [testObj1, testObj2, testObj3] = [{ test: [1, 2, 3] }, { test: [4, 5, 6] }, { test: [7, 8, 9] }];
const testObjs = [testObj1, testObj2, testObj3];
console.log(testObjs.map(obj => obj.test))// [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
console.log(testObjs.flatMap(obj => obj.test));// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

// about sort: 
/*
return > 0, a, b
return < 0, b, a
*/
const testArr6 = [1, 65, 88, -45, -35, 42];
console.log(testArr6.sort((a, b) => a - b));// [ -45, -35, 1, 42, 65, 88 ]

// more methods

const testArr7 = new Array(7);// cannot use map() to fill this empty array
console.log(testArr7.fill(1, 3, 5));// [ <3 empty items>, 1, 1, <2 empty items> ], 3, 5 → index
console.log(testArr1.fill(1, 0, 4));// [1, 1, 1, 1, 5, 6, 7, 8, 9, 10]

/*
Array.from(arrayLike[, mapFn[, thisArg]])
arrayLike： This is a mandatory parameter representing the class array object or iterable object to be converted to an array. 
    Class array objects refer to objects that have a length property and access elements by index; 
    Iterable objects such as String, Set, Map, etc. can be used with for The object traversed by the loop.
mapFn： This is an optional parameter and a mapping function that will be executed on each element of the new array. 
    This function takes two parameters, namely the value of the current element and the index of the current element.
thisArg： Also an optional parameter used to specify the value of this when executing the mapFn function.
*/
const testArr8 = Array.from({ length: 7 }, (_, index) => index + 1);
// _ means unused variable, the parameter order is the same as map().
console.log(testArr8);
// from can also use to create a new array from DOM elements: Array.from(document.querySelectorAll('h1'));
// and the arr created by from() is availabel to use map().
const testArr9 = Array.from({ 0: 'a', 1: 'b', 2: 'c', length: 3 });
console.log(testArr9);// [ 'a', 'b', 'c' ]
console.log(Array.from('abc'));
const obj = { multiplier: 2 };
const numbersToMultiply = [1, 2, 3];
const multipliedNumbers = Array.from(numbersToMultiply, function (num) {
    return num * this.multiplier;
}, obj);
console.log(multipliedNumbers); // [2, 4, 6]