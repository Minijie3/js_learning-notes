console.log(23 === 23.0);// nums stored in js as float

console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);// flase, for the reason that binary numbers are not exact in computer

// Conversion
console.log(Number('23'));
console.log(+'23');// 23(Number)

// Parsing
console.log(Number.parseInt('30px', 10));// 30
console.log(Number.parseInt('e23', 10));// NaN

console.log(Number.parseInt('  2.5rem  '));// 2
console.log(Number.parseFloat('  2.5rem  '));// 2.5

// Check if value is NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));// false
console.log(Number.isNaN(+'20X'));// true
console.log(Number.isNaN(23 / 0));// false: infty is not NaN

// Checking if value is number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));// false
console.log(Number.isFinite(+'20X'));// false
console.log(Number.isFinite(23 / 0));// false

console.log(Number.isInteger(23));// true
console.log(Number.isInteger(23.0));// true
console.log(Number.isInteger(23 / 0));// false


console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2));// 23
console.log(Math.max(5, 18, '23px', 11, 2));// 23
// JavaScript will convert the string to number from the start to the first non-number character.
// If the start of the string is not a number, it will return NaN.

console.log(Math.min(5, 18, 23, 11, 2));

console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);// random() gives a number between 0 and 1(1 is not included).

// Rounding integers
// round: rounded it up
console.log(Math.round(23.4));
console.log(Math.round(23.5));

// ceil: rounded up
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

// floor: rounded down
console.log(Math.floor(23.3));
console.log(Math.floor('23.9'));

// trunc: ignore downward rounding of symbols
console.log(Math.trunc(23.3));

console.log(Math.trunc(-23.3));// -23
console.log(Math.floor(-23.3));// -24

// Rounding decimals
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));

// remainder operator: %

const bigNumber = 100_235_458_412_411;
console.log(bigNumber);// 100235458412411
const transferFee1 = 15_00;
const transferFee2 = 1_500;
console.log(transferFee1 === transferFee2)// true

const PI = 3.14_15;
console.log(PI);

console.log(Number('230_000'));// NaN
console.log(parseInt('230_000'));// 230

// new type: bigint
console.log(Number.MAX_SAFE_INTEGER === 2 ** 53 - 1);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);// When the number exceeds the maximum, precision is lost.

console.log(4838430248342043823408394839483204n);
console.log(BigInt(48384302));

// Operations
console.log(10000n + 10000n);
console.log(36286372637263726376237263726372632n * 10000000n);
// console.log(Math.sqrt(16n)); will throw an error.

const huge = 20289830237283728378237n;
const num = 23;
console.log(huge * BigInt(num)); // huge * num will throw an error.

// Exceptions
console.log(20n > 15);// true
console.log(20n === 20);// false
console.log(typeof 20n);// bigint
console.log(20n == '20');// true

console.log(huge + ' is REALLY big!!!');

// Divisions
console.log(11n / 3n);// 3n
console.log(10 / 3);

//date
const now = new Date();
console.log(now);// 2025-02-07T11:25:54.637Z(by nodejs)

console.log(new Date('Aug 02 2020 18:05:41'));// Automatic analysis
console.log(new Date('December 24, 2015'));

console.log(new Date(2037, 10, 19, 15, 23, 5));// year month day hour minute second
// notice: 10 → Nov, cause month is 0 based
console.log(new Date(2037, 10, 31));// 2037-11-30T16:00:00.000Z
/*
November doesn't have 31 days, so JavaScript automatically adjusts the date. 
Specifically, November 31 would be interpreted as the day before December 1, i.e., November 30.
Therefore, new Date(2037, 10, 31) actually generates a date object for November 30, 2037.
Also, console.log outputs the UTC time, not the local time. 
Is that why you see output like 2037-11-30T16:00:00.000Z, where T16:00:00.000Z represents 16:00:00 UTC time
*/

console.log(new Date(0));// time stamp: 0 → 1970-01-01T00:00:00.000Z
console.log(new Date(3 * 24 * 60 * 60 * 1000));


// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());// not getYear() 
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());// 2037-11-19T15:23:00.000Z
console.log(future.getTime());

console.log(new Date(2142256980000));

console.log(Date.now());// 1738927554648: time stamp

future.setFullYear(2040);
console.log(future);

// date can be calculated cased in the time stamp.
const calcDaysPassed = (date1, date2) =>
    Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);// string - string → number - number

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);