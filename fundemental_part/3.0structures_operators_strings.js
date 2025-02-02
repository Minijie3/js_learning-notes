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