'use strict'
/*
According to https://github.com/jonasschmedtmann, I adapted some examples of data structures, modern
operators and strings in JavaScript.
*/

const days = ['monToFri', 'sat', 'sun'];

const openingHours = {
    [days[0]]: {
        open: 10,
        close: 22,
    },
    [days[1]]: {
        open: 11,
        close: 23,
    },
    [days[2]]: {
        open: 12,
        close: 24,
    },
};

const restaurant = {
    name: 'Fe3000\'s house',
    location: 'The Male-Lady\'s House, Chengdu, Sichuan, China',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    openingHours,

    orderMenu(starterIndex, mainIndex) {
        const [starterRes, mainRes] = [[], []];
        for (let i = 0; i < starterIndex.length; i++) {
            starterRes.push(this.starterMenu[starterIndex[i]]);
            mainRes.push(this.mainMenu[mainIndex[i]]);
        };
        let orderRes = `You ordered:
        ${starterRes.join(', ')} for the starterMenu. 
        ${mainRes.join(', ')} for the mainMenu.`;
        return orderRes;
    },

    deliverySevice(starterIndex = [0], mainIndex = [0], time, address) {
        const orderRes = this.orderMenu(starterIndex, mainIndex);
        return `Your order has been received by ${this.name}!
        ${orderRes}
        According to your request, we will deliver your order to ${address} before ${time}.`
    },

    pizzaRequest(...intergrates) {
        return `Your request about pizza has been received by ${this.name}!
        Your pizza will be made up of ${intergrates.join(', ')}.`;
    },
};

const { openingHours: { monToFri: weekdays, sat: saturday, sun: sunday } } = restaurant;
console.log(weekdays, saturday, sunday);

const deliveryRes = [[0, 1], [2, 3], '20:00', 'Harbin Institue of Technology, Shenzhen']
console.log(restaurant.deliverySevice(...deliveryRes));

console.log(restaurant.pizzaRequest('peanut', 'cheese', 'pepperoni'));

console.log(restaurant.bossConnect ?? 'I want to connect to the boss.')
console.log(false || '', undefined ?? null) // returned '' and null
// ?? : undefined or null → falsy

restaurant.owner ??= '<ANONYMOUS>';
console.log(restaurant.owner);

/*
for a ** b
|| : if a is falsy, then return b, else return a.
&& : if a is truthy, then return b, else return a.
?? : same as ||, but only undefined or null → falsy.
For more parameters, the order is '→'.
Sometimes && can be used to replace if else statement. For example:
if (a < b) actions;
can be replaced by:
a < b && actions;
*/

for (const item of restaurant.categories) console.log(item);

console.log(restaurant.openingHours.sat?.open, restaurant.openingHours.mon?.close)// 11 undefined
/*
?. : if the property exists, then return the property, else return undefined.(Equaling to if)
Just see it as if, so it can be used to objects, arrays and so on.
*/
console.log(restaurant.openingHours?.mon?.open, restaurant.openingHours.mon)// undefined undefined
/*
If wirte 'console.log(restaurant.openingHours.mon.open)' directly, it will throw an error, cause 
this equals to 'console.log(undefined.open)', TypeError will be thrown.
*/
console.log(restaurant.italianRequest?.('tomatoes, peanut') ?? 'There is no such functions.')
// There is no such functions.

const [properties, values] = [Object.keys(restaurant.openingHours), Object.values(restaurant.openingHours)];
console.log(properties); // [ 'monToFri', 'sat', 'sun' ]
console.log(values);
/*
[
  { open: 10, close: 22 },
  { open: 11, close: 23 },
  { open: 12, close: 24 }
]
*/
// Similar to dictionary in Python.
console.log(Object.entries(restaurant.openingHours));
/*
[
  [ 'monToFri', { open: 10, close: 22 } ],
  [ 'sat', { open: 11, close: 23 } ],
  [ 'sun', { open: 12, close: 24 } ]
]
*/
/*
NOTICE!
for ... of can only be used in iterabel things. For example:
game.score = [1, 2, 3, 4, 5];
if write:
for (const [i, item] of [game.score.length, game.score])
it will throw an error, cause this code means that game.score.length is iterabel.
So if we want to get the index of game.score, it should be:
for (const [i, item] of game.score.entries())
cause for objects: entries() method will return [[key1, value1], [key2, value2]...]
but for arrays: entries() method will return [[index1, value1], [index2, value2]...]
then JavaScript will take [i, item] = [index, value].
but notice that for objects, entries method should be written like: Object.entries(objectName)
*/

for (const [day, { open: openTime, close: closeTime }] of Object.entries(restaurant.openingHours)) {
    console.log(`On ${day}, we open at ${openTime}:00 and close at ${closeTime}:00.`);
};

const testSet = new Set(['a', 'b', 'c', 'a', 'b', 'c']);
console.log(testSet);// Set(3) { 'a', 'b', 'c' }
testSet.add('d');
testSet.delete('b');
console.log(testSet, testSet.has('a'), testSet.size);// Set(3) { 'a', 'c', 'd' } true 3
/*
Just like sets in Python or math, The values in a set are distinct, and the order does not matter,
which means that it is meaningless to extract values from it; 
therefore, sets have no way to obtain index and value.
BUT looping is valid just like other iterables.
And NOTICE that new sets(ITERABELS).
*/
for (const item of testSet) console.log(item);// that's OK.
const staff = ['manager', 'waiter', 'chef'];
console.log([...new Set(staff)]);// set → array
console.log(new Set('jonasschmedtmann'));// { 'j', 'o', 'n', 'a', 's', 'c', 'h', 'm', 'e', 'd', 't' }
console.log(new Set('sanqiantiekuai is a nice woman').size);// count the unique letters in a string.

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));
rest
    .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
    .set('open', 11)
    .set('close', 23)
    .set(true, 'We are open :D')
    .set(false, 'We are closed :(');
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));
const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
console.log(rest.has('categories'));
rest.delete(2);
const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest);
console.log(rest.size);
console.log(rest.get(arr));
/* 
What should be NOTICE is that if write "rest.set([1, 2], 'Test)'", 
it won't work when we use "rest.get([1, 2])".
Because the array is a reference type, and the array is not the same as the array in the map.
So arrays must be stored in a certain variable.
*/
rest.clear()
rest.set([
    ['question', 'who\'s the most beautiful girl in the world?'],
    ['1', 'answer1'],
    ['2', 'answer2'],
    ['3', 'sanqiantiekuai'],
    ['correct', 3],
    [true, 'correct!'],
    [false, 'u a wrong.']
]);
console.log(rest);
const restAnother = new Map([
    ['question', 'who\'s the most beautiful girl in the world?'],
    [1, 'answer1'],
    [2, 'answer2'],
    [3, 'sanqiantiekuai'],
    ['correct', 3],
    [true, 'correct!'],
    [false, 'u a wrong.']
]);
console.log(restAnother);
/*
The result of the two:
Map(1) {
  [
    [ 'question', "who's the most beautiful girl in the world?" ],
    [ '1', 'answer1' ],
    [ '2', 'answer2' ],
    [ '3', 'sanqiantiekuai' ],
    [ 'correct', 3 ],
    [ true, 'correct!' ],
    [ false, 'u a wrong.' ]
  ] => undefined
}
Map(7) {
  'question' => "who's the most beautiful girl in the world?",
  '1' => 'answer1',
  '2' => 'answer2',
  '3' => 'sanqiantiekuai',
  'correct' => 3,
  true => 'correct!',
  false => 'u a wrong.'
}
According to the result, object can be converted to Map.
*/
const restaurantMap = new Map(Object.entries(restaurant));
console.log(restaurantMap);
// Map is also iterable
console.log(restAnother.get('question'));
for (const [index, answer] of restAnother.entries()) {
    if (typeof index === 'number') console.log(`Answer ${index}: ${answer}`);
};
console.log(...restAnother, ...rest);// latter: undefined
//NOTICE: Map.values/keys() → Map Iterator but not array

//ABOUT STRINGS
const testString = 'sanqiantiekuai is my son';
console.log(testString.indexOf('sanqiantiekuai'));// 0
console.log(testString.slice(-1));// n
console.log(testString.slice(0, testString.indexOf(' ')));
console.log(testString.slice(testString.lastIndexOf(' ') + 1, -1));//'so' → [a,b)
console.log(testString.slice(1, 0));// Nothing happened for this situation.
const strObj = new String('sanqiantiekuai');// the method return 'string' but not object.
console.log(testString.toUpperCase())

const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';
// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
// What should be NOTICE is that trim method must use from the start or the end.
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

const announcement =
    'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));
// Alternative solution to replaceAll with regular expression
console.log(announcement.replace(/door/g, 'gate'));

const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.startsWith('Airb'));

const testNameSex = 'sanqiantiekuai-female';
const [testName, testSex] = testNameSex.split('-');
const newName = ['Ms', testName.toUpperCase()].join('.');
console.log(newName);

const message2 = 'Bad waether... All Departues Delayed... ';
console.log(message2.repeat(5));

