const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n').map(l => l.split(' '));

const ROCK = 'A';
const PAPER = 'B';
const SCISSOR = 'C';

const MOVES = {
    [ROCK]: { is: ROCK, win: PAPER, draw: ROCK, loss: SCISSOR, points: 1 },
    [PAPER]: { is: PAPER, win: SCISSOR, draw: PAPER, loss: ROCK, points: 2 },
    [SCISSOR]: { is: SCISSOR, win: ROCK, draw: SCISSOR, loss: PAPER, points: 3 },
}
const GAME = {
    X: { is: 'loss', points: 0 },
    Y: { is: 'draw', points: 3 },
    Z: { is: 'win', points: 6 }
}

let sum = 0;
for (let [move, result] of input) {
    const gameResult = GAME[result];
    const expectedMove = MOVES[move][gameResult.is]

    const points = gameResult.points + MOVES[expectedMove].points

    sum += points;
}


console.log(sum);