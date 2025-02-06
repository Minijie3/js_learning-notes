'use strict'

// simple methods

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