const EE = require("events")

const { HEADERS_END, SEP, CHUNKED_REGEX, DEFAULT_MAX_BODY_BYTES } = require("./constants");
const { getContentLength, getHeader, isHttpRequest } = require("./utils");

function HttpParser(mode = "REQUEST") {
    this.mode = mode;
    this.buffer = Buffer.alloc(0);
    this.state = {
        headersEnd: false,
        messageBegin: false,
        messageEnd: false,
        transferType: undefined,
        contentLen: undefined,
    };
    EE.call(this)
}

Object.setPrototypeOf(
    HttpParser.prototype,
    EE.prototype
);

function ServerRequest() {
    this.headers = undefined;
    this.body = undefined;
    this.url = undefined;
    this.method = undefined;
}

HttpParser.prototype.execute = function execute(data) {
    // I just received data, lets append it to our buffer
    this.buffer = Buffer.concat([this.buffer, data])
    if (!this.messageBegin && isHttpRequest(this.buffer)) {
        this.emit('messageBegin', this);
    }
    if (!this.state.headersEnd) {
        const headers = this.processHeaders(this.buffer);
        if (!headers) return;
        this.emit('headersEnd', headers);
        this.headersEnd = true;
    }
    if (!this.state.messageEnd)
    {
        this.processBody(this.buffer);
    
    }
}

HttpParser.prototype.processHeaders = function processHeaders(buffer) {
    let headersEnd = buffer.indexOf(HEADERS_END);
    if (!headersEnd) return null;
    headersEnd += 4;
    const headersData = this.parseHeaders(buffer);
    if (!headersData) return null;
    if (!this.transferType) {
        this.transferType = String(headersData["transfer-encoding"] || "").toLowerCase();
        const isChunked = CHUNKED_REGEX.test(transferType)
        if (!isChunked) {
            const contentLen = parseInt(getHeader(headersData, "content-length") || "0", 10);
            if (contentLen > DEFAULT_MAX_BODY_BYTES) {
                console.error("Exceeded max body size")
                return ;
            }
            this.transferType = "content-length"
        }
    }
    return headersData ; 
}

HttpParser.prototype.parseHeaders = function parseHeaders(buffer) {
    const raw = headersPart.toString("ascii");
    let headersEnd = raw.indexOf(HEADERS_END);
    if (headersEnd === -1) return null;
    headersEnd += 4;
    const headersPart = raw.slice(0, headersEnd);
    const lines = headersPart.split(SEP);
    const firstLineParts = lines[0].split(" ");
    const [method, rawPath, version] = firstLineParts
    const [path, queryString] = rawPath.split("?", 2)
    const queryParams = parseQueryString(queryString);
    const headersData = {}
    for (let i = 1; i < lines.length ; i++) {
        const line = lines[i];
        let [key, ...values] = line.split(":");
        if (!key || values.length === 0) {
            throw new Error(`Invalid header ${line}`);
        }; 
        key = key.toLowerCase().trim();
        const value = values.join(":").trim();
        if (key === "set-cookie") {
            if (!Array.isArray(headersData[key])) {
                headersData[key] = []
            }
            headersData[key].push(value)
        } else if (headersData[key]) {
            headersData[key] = `${headersData[key]}, ${value}`
        } else {
            headersData[key] = value
        }
    }
    return {
        method,
        path,
        version,
        headers: headersData,
        queryParams
    } ;
}

function parseQueryString(queryString) {
    const queryParams = {};
    if (!queryString) return queryParams;
    const queries = queryString.split("&")
    for (let i = 0; i < queries.length; i++) {
        let [key, value = ""] = queries[i].split("=");
        key = decodeURIComponent(key.replace(/\+/g, " ")).trim();
        value = decodeURIComponent(value.replace(/\+/g, " ")).trim();
        if (key) {
            queryParams[key] = value;
        }
    }
    return queryParams ;
}
module.exports = {
    HttpParser
}