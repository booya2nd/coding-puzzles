const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n').map(l => l.split(''))

function getPrio(char){
    const code = char.charCodeAt(0);
    return code >= 97 ? code-97+1 : code-65+27
}

let sum = 0;
for(let i=0; i<input.length; i+=3) {
    const [a,b,c] = input.slice(i,i+3);
    const match = a.find(_a => b.includes(_a) && c.includes(_a))

    sum += getPrio(match);
}

console.log(sum);


