function HttpParser(mode = "REQUEST") {
    this.mode = mode;
    this.buffer = undefined;
    this.headers = undefined;
    this.body = null;
    this.result = null;
    this.state = {
        headersEnd: false,
        messageBegin: true,
        transferType: undefined,
        contentLen: undefined,
    };
}

function ServerRequest() {
    this.headers = undefined;
    this.body = undefined;
    this.url = undefined;
    this.method = undefined;
}

HttpParser.prototype.execute = function execute(data) {
    // I just received data, lets append it to our buffer
    this.buffer = Buffer.concat([this.buffer, data])
    if (!this.headers) {
        this.processHeaders(data);
    }
    console.log("Executed", server)
}

function processHeaders(parser) {
    if (this.headers) return ;
    bufferRef = state.buffer;
    headersEndIndex = bufferRef.indexOf("\r\n\r\n");
    if (!headersEndIndex || isHttpRequest(this.buffer))
        return ;
        console.log(bufferRef, headersEnd, 'this is my data');
}

module.exports = {
    HttpParser
}