const { openSync, readSync, writeFileSync, readFileSync } = require("fs")
const path = require("path")
//Example opening file that does not exist
function readLineSync(promptText) {
  process.stdout.write(promptText)
  const buffer = Buffer.alloc(1024)
  const bytesRead = readSync(0, buffer, 0, buffer.length)
  return buffer.toString('utf8', 0, bytesRead).trim()
}

function main() {
    try {
        const fdNotExist = openSync("./content/I-dont-exist.tx");
    } catch (error) {
        console.log("error while opening file", error)
    }
    const OUTPUT_FILE = './result.txt'
    
    let label = readLineSync('What would you like to name this file? ')
    if (!label) label = 'untitled'
    
    
    const first = openSync("./content/first.txt", "r")
    const second = openSync("./content/second.txt", "r")
    const buf1 = Buffer.alloc(1024)
    const buf2 = Buffer.alloc(1024)
    let r = readSync(first, buf1, 0, buf1.length)
    if (r < 0 ) console.log("Error while reading, bytes:", r)
    r = readSync(second, buf2, 0, buf1.length)
    if (r < 0 ) console.log("Error while reading, bytes:", r)
    let third = `${buf1.toString('utf-8')} ${buf2.toString('utf-8')}`;
    let lines = third.split('\n');
    let result = ""
    for (let i = 0; i < lines.length; i++)
    {
        result += ` ${lines[i]} ###`
    }
    result = `// Saved as: ${label}\n\n${result}`
    console.log(`Done. Wrote "${label}" content to ${path.resolve(OUTPUT_FILE)}`)
    console.log("I run first")
    writeFileSync(OUTPUT_FILE, result);
    setTimeout(() => {
        console.log("file read is: ", readFileSync("result.txt").toLocaleString())
    }, 4000)

}

main()