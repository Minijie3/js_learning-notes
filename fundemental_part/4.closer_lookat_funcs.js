'use strict'

const sanqiantiekuai = {
    name: 'sanqiantiekuai',
    birthYear: 2004,
};
const Num = 20;

const changeName = function (testNum = 5, passenger) {
    testNum = 10;
    passenger.name = passenger.name.toUpperCase();
    console.log(passenger);
};// testNum → default parameter

changeName(Num, sanqiantiekuai);
console.log(Num, sanqiantiekuai.name);// 20 SANQIANTIEKUAI
/*
Num is not changed because it is a primitive value.
Sanqiantiekuai.name is changed because it is a reference value.
See it as the reference in C++.
*/

/*
JavaScript has higher order functions, which are functions that take other functions as arguments 
or return functions as results. 
That's not something unusual so I think there's no need to explain it...
It's important but just skip()
just like this:
*/

const higherOrderFunc = str => another => function () {
    console.log(str + ' ' + another);
};
higherOrderFunc('test')('here')();

/*
ABOUT call and apply method
generally speaking: for common functions(it must be COMMON funcion, not arrow function) containing 
this keyword, the call and apply method can be used to change the 'direction' of 'this' keyword.
call(object_pointed, parameter1, parameter2, ...) = apply(object_pointed, [parameter1, parameter2, ...])
*/
const company1 = {
    airline: 'China Eastern Airlines',
    itsCode: 'MU',
    bookings: [],
    book(bookNumbering, name) {
        console.log(`${name} has booked a seat on ${this.airline} for the flight:
            ${this.itsCode + bookNumbering}`);
        this.bookings.push({ flight: this.itsCode + bookNumbering, name });
    },
};

const company2 = {
    airline: 'China Southern Airlines',
    itsCode: 'CZ',
    bookings: [],
};

const book = company1.book;
book.call(company2, 5258, 'Sarah');// book.apply(company2, [5258, 'Sarah']);
console.log(company2);
/*
ANOTHER WAY:
    company2.book = book;
    company2.book(23, 'Sarah');
*/

/*
ABOUT bind:
Return a new function, which is a copy of the original function, but with a different this keyword.
It allows pass parameters in advance to fixed relative parameters.
This method is often used in event handlers.
*/
const bookMU = company1.book.bind(company1, 5845);
bookMU('Steve');
console.log(company1);

// IIFE
(function () {
    var isPrivate = 46;
    console.log('This will never run again');
})();
// console.log(isPrivate); → throw an error
/*
var: Function scope or global
let/const: Block scope
*/
(() => console.log('This will ALSO never run again'))();
/*
【IMPORTANT UNDERSTANDING NOTES】
For the IIFE below:
(function(){
    console.log('A IIFE here.');
})();
→ equals to:
const func = function(){
    console.log('A IIFE here.');
};
func();
which means that IIFE will also make a function scope. This is very important to understand closure.
*/

/*
Closure = Function + Its lexical environment at creation time
Formed when a function remembers and accesses its lexical scope 
even when executed outside that scope.

【Key Characteristics】
 * 1. Context Retention: Access to creation-time scope chain
 * 2. Data Encapsulation: Enables private variables and modular code
 * 3. Memory Persistence: Referenced outer variables remain in memory
 * 4. Caveat: Potential memory leaks with improper usage
 */

//【Common Use Cases】
// 1. Counter Example: Maintaining private state
function createCounter() {
    let count = 0; // Private variable
    return function () {
        return ++count;
    };
};
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
// NOTICE: Closure > global scope
/*
When using counter(), the counter function didn't find the count variable in its local scope. Instead, 
then looked for the closure → count was found.
*/

// 2. Module Pattern: Encapsulating implementation
const calculator = (function () {
    // Private state
    let memory = 0;
    // Private method
    function logOperation(op) {
        console.log(`Performed operation: ${op}`);
    };
    // Expose public API
    return {
        add: function (x) {
            logOperation('Addition');
            memory += x;
            return this;
        },
        getValue: function () {
            return memory;
        }
    };
})();
console.log(calculator.add(10), calculator.getValue());
/*
A function created in an object is not created in an environment that is not an object. For example,
add and getValue function are created in the IIFE.
*/

// 3. Event Handlers: Preserving context
function setupButtons() {
    for (var i = 1; i <= 3; i++) {
        // IIFE to capture current i value
        (function (index) {
            document.getElementById(`btn-${index}`).addEventListener('click', function () {
                console.log(`Clicked button ${index}`);
            });
        })(i);
    };
};
/*
IMPORTANT EXPLAIN: Cognitive refresh of for loops and variable declarations
【Use IIFE or let declaration in loops to capture iteration values】
1. if write:(wrong)
function problemDemo() {
  for (var i = 1; i <= 3; i++) {
    document.getElementById(`btn-${i}`).addEventListener('click', function() {
      console.log(`Clicked button ${i}`);
    });
  }
}
The i declared by var is a function-level scope, and the entire loop shares the same variable.
So the code equals to:
const i = 4;
document.getElementById(`btn-${i}`).addEventListener('click', ...);
document.getElementById(`btn-${i}`).addEventListener('click', ...);
document.getElementById(`btn-${i}`).addEventListener('click', ...);

2. if write like those uncommented(IIFE):
Cause the use of IIFE, each loop creates a new function scope. When the i declared by var is passed in
as parameter, The event callback function forms a closure that captures the index of the current scope.
This means that closure usually happen in a callback function.

3. if write(use let):
function modernSolution() {
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`btn-${i}`).addEventListener('click', function() {
      console.log(`Clicked button ${i}`);
    });
  }
};
Each loop creates a new block-level scope. When the i declared by let is passed in as parameter, 
each callback closure captures the i of the current scope.
*/