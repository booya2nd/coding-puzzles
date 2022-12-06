const text = require('fs').readFileSync('input.txt', 'utf8').trimEnd();

const size = 4;
for (let i=size; i<text.length; i++) {
    if (new Set([...text.substr(i-size,size)]).size === size) {
        console.log(i);
        break;
    }
}
