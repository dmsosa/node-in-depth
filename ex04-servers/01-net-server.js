const ft_http = require("./ft_http/index.js")

const server = ft_http.createServer((server) => {
    console.log(server, "this is my server")
})

server.listen(5000)