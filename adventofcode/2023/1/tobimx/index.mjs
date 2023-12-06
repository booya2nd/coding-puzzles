import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', { encoding: 'utf-8' }).split('\n');
let sum = 0;

const NUM = [
    ['1', 'one'],
    ['2', 'two'],
    ['3', 'three'],
    ['4', 'four'],
    ['5', 'five'],
    ['6', 'six'],
    ['7', 'seven'],
    ['8', 'eight'],
    ['9', 'nine']
];

function getNumeric(value) {
    const order = NUM.map((nums, i) => {
        return nums.map((num) => {
            const index = value.indexOf(num);
            let lastIndex = value.lastIndexOf(num);
            if (lastIndex === index) {
                return { value: String(i + 1), index };
            }

            return [
                { value: String(i + 1), index },
                { value: String(i + 1), index: lastIndex}
            ];
        }).flat();
    })
        .flat()
        .filter(({ index }) => index !== -1)
        .sort(({ index: a }, { index: b }) => a - b);

    if (!order.length) return 0;
    return order[0].value + order[order.length - 1].value;
}

input.forEach((line) => {
    const num = getNumeric(line);
    sum += Number(num);
});

console.log(sum);