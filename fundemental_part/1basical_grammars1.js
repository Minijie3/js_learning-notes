'use strict'
/*
Some basical grammars.
*/

let age = 14;
const jonas = `I'm ${age} years old`;
console.log(jonas, typeof joans);// undefined
console.log(jonas.substring(1, 5), jonas.indexOf('a', 2))// 'm 1 9

let test = '0test'
console.log(parseInt(test))// 0

let result;
if (age >= 18) {
    result = 'adult';
} else if (age >= 13) {
    result = 'teenager';
}

console.log(result);
console.log(Symbol('of') == Symbol('of')) // false

console.log("18" == 18, "18" === 18)// true false

/*
There are primitive types and reference types in JavaScript.
Primitive types are stored directly in the variable, while reference types are stored in the memory 
heap and the variable is a pointer to the memory location.
So:
*/
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
console.log(arr1 == arr2);// false
console.log(arr1 === arr2);// false
// So the assignment of reference types is not by value, but by 'address'.
// so if 
const arr3 = arr1;
console.log(arr3 === arr1);// true
arr3[0] = 4;
console.log(arr1);// [ 4, 2, 3 ]