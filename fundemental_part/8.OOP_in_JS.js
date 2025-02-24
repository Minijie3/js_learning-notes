'use strict'

// about constructor
const Person = function (name, age) {
    this.name = name;
    this.age = age;
};
const sanqiantiekuai = new Person('sanqiantiekuai', 19);
console.log(sanqiantiekuai);

// about prototype
/*
It's not a good way to add a method to a constructor function. Cause it will add a method to all the 
instances of the constructor function, which will slow down the performance.
*/
Person.prototype.calcAge = function () {
    console.log(this.age);
};
console.log(sanqiantiekuai.__proto__ === Person.prototype);
console.log(Person.prototype);// { calcAge: [Function (anonymous)] }
// in fact, there is a constuctor property in the Person.prototype, which is the constructor function itself.

/*
prototype chain:
In JavaScript, the prototype chain is a fundamental mechanism for inheritance and sharing properties and 
methods between objects. Every object in JavaScript has an internal property called `[[Prototype]]` 
(which can be accessed via `__proto__` in most browsers, though it's non - standard). When a property 
or method is accessed on an object, JavaScript first checks if the object itself has that property. 
If not, it looks up the prototype chain by checking the object's `[[Prototype]]`. 
This process continues recursively up the chain until the property is found or until it reaches 
the end of the chain, which is the `Object.prototype`. If the property isn't found even at `Object.prototype`,
`undefined` is returned. Functions in JavaScript also have a `prototype` property, which is used when creating
objects with the `new` keyword. The newly created object will have its `[[Prototype]]` set to the function's 
`prototype` object, allowing objects created from the same constructor function to share properties and 
methods defined on that `prototype`. This chain - like structure provides a powerful way to achieve code 
reuse and build complex object hierarchies in JavaScript. 
*/

// another way to realize prototype: Object.create()
const PersonProto = {
    init(name, birthYear) {
        this.name = name;
        this.birthYear = birthYear;
    },

    calcAge() {
        console.log(2037 - this.birthYear);
    },
};
const testCreate = Object.create(PersonProto);// equals to testCreate.__proto__ = PersonProto;
console.log(testCreate);// {}
testCreate.init('sanqiantiekuai', 2004);// more standard way to assign to properties
testCreate.calcAge();// 33
console.log(testCreate.__proto__);// {calcAge: ƒ}

// ES6 Classes
class PersonClass {
    constructor(name) {
        this._name = name;
    }

    // 【ABOUT STATIC METHOD】
    static hey() {
        console.log('Hey there!');
        console.log(this);
    }

    /*
    【ABOUT GETTER AND SETTER】
    If the property is written as' name 'instead of' name ', then when calling' person.name ', returning' this.name 'will call this getter method again, 
    causing infinite recursion. Therefore, it is common to add' _ 'before the property name, and use the original name for the getter and setter names. This is a convention
    */
    // getter of name
    get name() {
        return this._name;
    }

    // setter of name
    set name(newName) {
        this._name = newName;
    }
};

const person = new Person('John');
console.log(person.name);
console.log(PersonClass.hey());// this → constructor of PersonClass
// console.log(person.hey()); will be wrong!


// 【ABOUT HERITAGE】
/*
PROTOTYPE CHAIN:

Object → Object.prototype → null
                ↑
type1 → type1.prototype
                ↑
type2 → type2.prototype
                ↑
               ...
which can use to implement inheritance.
*/
// 1ST way: traditional JavaScript
const Student = function (name, age, major) {
    Person.call(this, name, age);
    this.major = major;
};
Student.prototype = Object.create(Person.prototype);
// about why not Student.prototype = Person.prototype:
/*
If write the latter, this line of code actually points the prototype object of the Student constructor and the prototype object of the Person constructor to the same memory address. 
This means that they share the same prototype object, and modifying one prototype object directly affects the other.
One important purpose of inheritance is to create a hierarchical prototype chain, allowing subclasses to inherit the properties and methods of their parent class, 
while also adding their own specific properties and methods. But using Student. prototype=Person. prototype cannot achieve this.
*/
const studentTradition = new Student('sanqiantiekuai', 18, 'Information Engineering');
studentTradition.calcAge();// 18
console.log(studentTradition instanceof Student, studentTradition instanceof Person, studentTradition instanceof Object);// true true true
console.log(studentTradition.__proto__.constructor);
/*
ƒ (name, age) {
    this.name = name;
    this.age = age;
}
*/
// we wanna Student {...}
Student.prototype.constructor = Student;
console.dir(studentTradition.__proto__.constructor);// Student(name, age, major)

// 2ND way: ES6
class StudentClass extends PersonClass {
    constructor(name, age, major) {
        super(name);
        this.age = age;
        this._major = major;
    }
    get major() {
        return this._major;
    }
};
console.dir(StudentClass.prototype.constructor);// class StudentClass