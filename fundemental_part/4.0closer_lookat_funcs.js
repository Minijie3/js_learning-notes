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