const fs = require('fs');


const closeCb = (err, fd) => {
    if (err) {
        console.log("error while closing file: ", err)
        return ;
    }
    console.log("fd closed")
}

const openCb = (err, fd) => {
    if (err) {
        console.log("error while opening file: ", err)
        return ;
    }
    const buffer = Buffer.alloc(1024);
    
    // Static fs.read(fd, buffer, offset, length, position, callback)
    fs.read(fd, buffer, 3, 5, 1, (err, bytesRead) => {
        if (err) throw err;
        console.log(buffer.toString('utf8', 0, bytesRead));
        fs.close(fd, () => {});
    });
}



try {
    const data = fs.open("does-not-exist.ma", openCb)
} catch (error) {
    console.log("errored", error)
}

console.log("I run first")
const data = fs.open("./content/first.txt", openCb)
