const net = require("net")

const server = net.createServer((socket) => {
    console.log("socet", socket);
})