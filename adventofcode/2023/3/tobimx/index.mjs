import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', { encoding: 'utf-8' }).split('\n');
const matrix = [];
const coordinates = [];

// matrix && num rects
input.forEach((line, y) => {
    const axis = [];
    const rect = { y, height: 1 };
    matrix.push(axis);
    
    for (let x=0; x<=line.trim().length; x+=1) {
        const sym = line[x];
        axis.push(sym);

        if (!isNaN(Number(sym))) {
            if (!rect.width) {
                rect.x = x;
                rect.width = 1;
                rect.value = sym;
            } else {
                rect.width += 1;
                rect.value += sym;
            }
        }
        else {
            const copy = { ...rect };
            coordinates.push(copy);
            rect.width = undefined;
            rect.value = undefined;
        }
    }

    if (rect.width) coordinates.push({ ...rect });
});

const rects = coordinates.filter(({ width}) => !!width );
coordinates.length = 0;

function getMatrixValue([ x, y ]) {
    try {
        const value = matrix[y][x];
        if (!value || value === '.' || !isNaN(Number(value))) return undefined;
        return value;
    } catch(e) {
        return undefined
    }
}


const standaloneNumbers = [];
const connectedToStar = {};

rects.forEach((rect) => {
    const { x, y, width, value } = rect;
    const coords = [
        [x - 1, y],
        [x - 1, y - 1],
        [x - 1, y + 1],
        [x + width, y],
        [x + width, y - 1],
        [x + width, y + 1]
    ];
    
    for (let i=0; i<=width; i+=1) {
        coords.push([x + i, y - 1], [x + i, y + 1]);
    }

    const result = coords.every((coord) => {
        if (getMatrixValue(coord) === '*') {
            const key = `${coord[1]}.${coord[0]}`;
            if (!connectedToStar[key]) connectedToStar[key] = [];
            connectedToStar[key].push(rect);
        }
        return !getMatrixValue(coord);
    });

    if (result) standaloneNumbers.push(Number(value));
});

console.log(connectedToStar);
let sum = 0;

Object.values(connectedToStar).forEach((num) => {
    if (num.length === 2)
    sum += (Number(num[0].value) * Number(num[1].value));
});

console.log(sum);