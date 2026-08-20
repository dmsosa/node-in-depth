// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require('./04-names')
const sayHi = require('./05-utils')
const data = require('./06-alternative-flavor')
const { otherNames } = names;
require('./07-mind-grenade')


setTimeout(() => {
    console.log("What is going to be written first?")
}, 0);

setTimeout(() => {
    console.log("What is going to be written first?")
}, 0);

setTimeout(() => {
    console.log("What is going to be written first?")
}, 0);

setImmediate(() => {
    sayHi(data.singlePerson);
})

for (let i = 0; i < otherNames.length; i++) {
    const element = otherNames[i];
    sayHi(element)    
}
sayHi('susan')
sayHi(names.john)
sayHi(names.peter)

process.nextTick(() => console.log("tick tock"))
process.nextTick(() => console.log("tick tock2"))
process.nextTick(() => console.log("tick tock3"))

//Second tests

const baz = () => console.log('baz');
const foo = () => console.log('foo');
const zoo = () => console.log('zoo');

const start = () => {
  console.log('start');
  setImmediate(baz);
  new Promise((resolve, reject) => {
    resolve('bar');
  }).then(resolve => {
    console.log(resolve);
    process.nextTick(zoo);
  });
  process.nextTick(foo);
};

start();

// start foo bar zoo baz