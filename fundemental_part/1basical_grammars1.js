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

