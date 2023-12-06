import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', { encoding: 'utf-8' }).split('\n');

function getCard(line) {
    let [win, bet] = line.split(':')[1].split('|');
    win = win.split(' ').map((value) => value.trim()).filter(Boolean).map((value) => Number(value));
    bet = bet.split(' ').map((value) => value.trim()).filter(Boolean).map((value) => Number(value));

    return { win, bet };
}

function getWinCount({ win, bet }) {
    let count = 0;

    bet.forEach((value) => {
        if (win.includes(value)) count += 1;
    });

    return count;
}

const result = [];
input.forEach((line, index) => {
    const debug = index === 7;

    const card = getCard(line);
    const winCount = getWinCount(card);
    let k = 1;

    if (!result[index]) result[index] = 0;
    result[index] += 1;
    
    while(k <= winCount) {
        if (!result[index + k]) result[index + k] = 0;
        result[index + k] += result[index];
        k += 1;
    }

});

result.length = input.length;
console.log(result, result.reduce((acc, num) => acc + num, 0));