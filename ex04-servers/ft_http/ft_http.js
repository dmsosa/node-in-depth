const net = require("net")

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
    this.emit('request', this);
}

Object.setPrototypeOf(Server.prototype, net.Server.prototype);
Object.setPrototypeOf(Server, net.Server);

function connectionListenerInternal(server, socket) {
    debug('SERVER new http connection');
    const state = {
        incoming: [],
        outgoing: [],
        socket: socket,
        server: server,
        outgoingData: 0,
        requestsCount: 0,
    }
    
    const parser = parsers.alloc()

    socket.on('data', (data) => {
        debug('SERVER socketOnData %d', dara.length);
        const result = parser.execute(data);
    });

    socket.on('error', (error) => {
        console.log(error)
    });
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
