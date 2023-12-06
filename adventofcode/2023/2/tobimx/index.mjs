import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', { encoding: 'utf-8' }).split('\n');
const games = [];

function getRoundResults(line) {
    let rounds = line.split(':');
    rounds.shift();
    rounds = rounds.join(':').split(';');
    
    return rounds.map((round) => {
        const result = round.split(',');
        return result.map((r) => {
            const [, count] =/(\d+)/.exec(r);
            const [, color] = /(red|green|blue)/i.exec(r);
            return { count, color };
        });
    });
}

function getGameResult(value) {
    const result = {};
    result.red = [];
    result.blue = [];
    result.green = [];

    value.forEach(({ count, color }) => {
        result[color].push(Number(count) || 0);
    });

    return Math.max(...result.red) * Math.max(...result.green) *Math.max(...result.blue);
}

input.forEach((line, i) => {
    const game = i + 1;
    const roundResult = getRoundResults(line).flat();
    const power = getGameResult(roundResult);
    games.push({ game, power });
});

let sum = 0;

games.forEach(({ power }) => {
    sum += power;
});

console.log(sum);