const HEADERS_END = '\r\n\r\n';
const SEP = '\r\n';

const CHUNKED_REGEX = /\bchunked\b/;
const DEFAULT_MAX_BODY_BYTES = 256 * 1024; //256 KB

// Keep-Alive policy
const KEEP_ALIVE_TIMEOUT_MS = 5000; // 5s idle timeout
const KEEP_ALIVE_MAX = 100;         // max requests per TCP connection

module.exports = {
    HEADERS_END,
    SEP,
    DEFAULT_MAX_BODY_BYTES,
    KEEP_ALIVE_MAX,
    KEEP_ALIVE_TIMEOUT_MS,
    CHUNKED_REGEX
}