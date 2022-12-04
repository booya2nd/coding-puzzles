const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n').map(l => l.split(' '));

const ROCK = 'A';
const PAPER = 'B';
const SCISSOR = 'C';

const MOVESXYZ = {
    X: { is: ROCK, beats: SCISSOR, points: 1 },
    Y: { is: PAPER, beats: ROCK, points: 2 },
    Z: { is: SCISSOR, beats: PAPER, points: 3 },
}
const POINTS = { LOSS: 0, DRAW: 3, WIN: 6 }

let sum = 0;
for (let [move, counter] of input) {
    const myMove = MOVESXYZ[counter];

    const isDraw = myMove.is === move ;
    const isWin = myMove.beats === move;

    let gamePoints = isWin ? POINTS.WIN : isDraw ? POINTS.DRAW : POINTS.LOSS;
    let points = myMove.points + gamePoints;

    sum += points;
}


console.log(sum);