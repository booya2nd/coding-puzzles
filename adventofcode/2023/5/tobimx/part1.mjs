import { readFileSync } from 'fs';

// slightly changed the input (line breaks) to simplify parser
const input = readFileSync('./input.txt', { encoding: 'utf-8' }).split('\n');
const data = [];

while(input.length) {
    const chunk = [];

    input.shift();
    let line = input.shift();

    while (line !== '') {
        chunk.push(line.split(' ').map((val) => Number(val)));
        line = input.shift();
    }

    data.push(chunk);
}

function traverse(value, index = 0) {
    const to = data[index];
    if (!to) return value;

    const map = to.filter(([, source, len]) => {
        return value >= source && value <= source + len;
    }).flat();
    
    if (!map.length) return (traverse(value, index += 1));

    const [target, source] = map;
    return (traverse(target + value - source, index += 1));
}

const result = data.shift().flat().map((seed, index) => {
    return traverse(seed);
});

console.log(result.sort());
