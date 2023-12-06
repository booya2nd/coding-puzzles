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

let sum = 0;
input.forEach((line) => {
    const card = getCard(line);
    const winCount = getWinCount(card);

    if (winCount > 0) {
        sum += (2 ** (winCount - 1));
    }
});

console.log(sum);