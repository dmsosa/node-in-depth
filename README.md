# What is this project ?

It is a series of micro-projects that serve as pedagogical route to learn the fundamentals about NodeJS and have a deep understanding of how this marvelous runtime environment allow developers to create JavaScript programs outside the browser, aiming to build robust applications oriented to solve real world problems. 

# Module Systems

1. CommonJS (synchronous) provides __dirname and __filename; ES Modules replace these with import.meta.url. 

2. ES6 Modules, the modern, (asynchronous) standard using import and export statements

File Extension	.js (default)	
.mjs or .js (with type: "module" in package.json)

Import	const mod = require('mod')	import mod from 'mod'
Export	module.exports = ...	export default ...


Browser Support	No (requires bundler)	Yes (native)
Best For	Legacy projects, Node-only apps	New projects, cross-platform/isomorphic code

# ex02 - the file system administrator

Create a simple program that try to read a file, modify its content and return a new file, ask for the name of it to be stored, and write it to a new file called new.txt




