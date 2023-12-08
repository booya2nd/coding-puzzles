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

const seeds = data.shift().flat();
data.forEach((i, iO) => {
    i.forEach((j, jO) => {
        const [next, min, len] = j;
        i[jO] = [min, min + len - 1, next - min];
    });

    data[iO] = i.sort(([a], [b]) => a - b);
});

function traverse([min, max], index = 0) {
    const to = data[index];
    if (!to) return [min, max];

    const ranges = to.filter(([rMin, rMax]) => rMin <= max && rMax >= min);
    const nextRanges = [];

    for (let i = min; i <= max;) {
        if (ranges.length === 0) {
            nextRanges.push([i, max]);
            break;
        }

        const match = ranges.find(([rMin, rMax]) => rMin <= i && rMax >= i);
        let nextRange;
        let matchMax;

        if (match) {
            const [, rMax, diff] = ranges.shift();
            matchMax = Math.min(max, rMax);
            nextRange = [i + diff, matchMax + diff];
        } else {
            const [rMin] = ranges[0];
            matchMax = Math.min(max, rMin);
            nextRange = [i, matchMax];
        }

        nextRanges.push(nextRange);
        i = matchMax + 1;
    }

    return nextRanges.flatMap(([rMin, rMax]) => {
        return traverse([rMin, rMax], index + 1);
    });
}

const result = [];
for (let i = 0; i < seeds.length; i += 2) {
    const locations = traverse([seeds[i], seeds[i] + seeds[i+1] - 1]); 
    result.push(...locations);
}


console.log(result.sort((a, b) => a - b)[0]);