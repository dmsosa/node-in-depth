const net = require("net");
const { parsers } = require("./common");

function Server(options, requestListener) {
    if (typeof options == 'function') {
        requestListener = options;
        options = {}
    } else if (options == null) {
        options = {}
    }
    
    net.Server.call(this, {
        highWaterMark: options.highWaterMark,
        keepAlive: options.keepAlive,
        keepAliveInitialDelay: options.keepAliveInitialDelay,
        noDelay: options.noDelay ?? true,
        allowHalfOpen: true,
    })

    if (requestListener) {
        this.on('request', requestListener);
    }

    this.on('connection', (socket) => {
        connectionListenerInternal(this, socket)
    });
}

Object.setPrototypeOf(Server.prototype, net.Server.prototype);
Object.setPrototypeOf(Server, net.Server);

function connectionListenerInternal(server, socket) {
    console.debug('SERVER new http connection');
    const state = {
        incoming: [],
        outgoing: [],
        socket: socket,
        server: server,
        outgoingData: 0,
        requestsCount: 0,
    }

    const parser = parsers.alloc()
    let req = null;
    socket.on('data', (data) => {
        console.debug('SERVER socketOnData %d', data.length);
        parser.execute(data);
    });

    socket.on('error', (error) => {
        console.log(error)
    });

    parser.on('onMessageBegin', () => {
        console.log('The Http Incoming Message begun')

    })
    parser.on('headersEnd', (headers) => {
        console.log('The Http headersEnd', headers)
        req = new ServerReq(socket);

        req.method = headers.method;
        req.url = headers.url;
        req.headers = headers.headers;
    })
    parser.on('bodyCompleted', (body) => {
        console.log('The Http headersEnd')
        req = new ServerReq(socket);

        req.method = headers.method;
        req.url = headers.url;
        req.headers = headers.headers;
        this.emit('request', this);
    })
}

/**
 * Creates a new TCP or IPC server
 * @param {{
 *   allowHalfOpen?: boolean;
 *   pauseOnConnect?: boolean;
 *   }} [options]
 * @param {Function} [requestListener]
 * @returns {Server}
 */

function createServer(options, requestListener) {
    return new Server(options, requestListener)
}

exports = module.exports = {
    createServer
};
