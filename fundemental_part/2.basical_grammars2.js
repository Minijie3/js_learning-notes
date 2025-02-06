'use strict'
/*
Some basical grammars.
*/

function testFuncDel(testNum) {
    return testNum > 0 ? 'positive' : 'negative';
};

const testFuncExp = function (testNum) {
    return testNum > 0 ? 'positive' : 'negative';
};

const testFuncArr = testNum => testNum > 0 ? 'positive' : 'negative';

console.log(testFuncDel(1), testFuncExp(-1), testFuncArr(1));

const arrFuncParam = (lover_one, lover_two) => {
    return `${lover_one} f**ks ${lover_two} in a crazy pace.`
};

console.log(arrFuncParam('三千铁块', '孙浩宇'));
console.log(arrFuncParam);// [Function: arrFuncParam]
/*
NOTICE: function is also value and object!
*/

let testString = 'how are u';
const testArrayEle = new Array(testString, 123);
testArrayEle[1] = 456;
const testArray = new Array(testArrayEle, 'hello world', 123);
console.log(testArray + 10); // how are u,456,hello world,12310: string

testArray.push('push');
testArray.unshift('unshift');
console.log(testArray);
const popped = testArray.pop();// Last
const shifted = testArray.shift();// First
const res = `${popped}
${shifted}
${testArray}
${testArray.indexOf('hello world')}`;// 1
console.log(res);

const sanqiantiekuai = {
    name: 'sanqiantiekuai',
    birthYear: 2004,
    sex: 'male',

    getAge: function () {
        console.log(this);
        return 2025 - this.birthYear;
    }
};
console.log(sanqiantiekuai);
console.log(sanqiantiekuai.name === sanqiantiekuai['name'])// 后者常用于 prompt
console.log(sanqiantiekuai.location)// undefined
console.log(sanqiantiekuai.getAge(), sanqiantiekuai['getAge']())