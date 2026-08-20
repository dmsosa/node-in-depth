// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require('./04-names')
const sayHi = require('./05-utils')
const data = require('./06-alternative-flavor')
const { otherNames } = names;
require('./07-mind-grenade')
sayHi('susan')
sayHi(names.john)
sayHi(names.peter)

setTimeout(() => {
    console.log("What is going to be written first?")
}, 5000);

setImmediate(() => {
    sayHi(data.singlePerson);
})

for (let i = 0; i < otherNames.length; i++) {
    const element = otherNames[i];
    sayHi(element)    
}
