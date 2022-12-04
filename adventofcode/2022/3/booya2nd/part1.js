const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n').map(l => l.split(''))

function getPrio(char){
    const code = char.charCodeAt(0);
    return code >= 97 ? code-97+1 : code-65+27
}

let sum = 0;
for(let l of input) {
    const m = l.length/2;
    const [a,b] = [l.slice(0,m), l.slice(m)];

    const match = a.find(_a => b.includes(_a));

    sum += getPrio(match);
}

console.log(sum);


