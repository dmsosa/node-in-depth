function isHttpRequest(str) {
    const eol = str.indexOf("\r\n");
    if (eol === -1) return false;
    const line = str.slice(0, eol);
    return /^[A-Z]+ [^\s]+ HTTP\/1\.[01]$/.test(line);
}

function getHeader(headers, key) {
    return (headers[key.toLowerCase()]);
}

module.exports = {
    isHttpRequest,
    getHeader,
}