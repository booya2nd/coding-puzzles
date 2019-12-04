/*** INPUT ***/
// const source = document.body.textContent.trim();
const fs = require('fs');
const path = require('path');
let input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8').trim();

const sample1 = `R8,U5,L5,D3
U7,R6,D4,L4`;
const sample2 = `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`;

const source = input;
const data = source.split('\n').map(line=>line.split(','));
const DIRECTIONS = { R:['x',+1], L:['x',-1], D:['y',+1], U:['y',-1] };

/*** ANALYZE ***/
const METRICS_ENTRY = {value:0, min:Infinity, max:-Infinity, size:0};
const METRICS = {x: {...METRICS_ENTRY}, y: {...METRICS_ENTRY}};
data.forEach(entry => {
  entry.forEach((lineInstruction) => {
    const direction = lineInstruction[0], length = lineInstruction.slice(1);
    const [coordsProp, sign] = DIRECTIONS[direction];
    const metricsEntry = METRICS[coordsProp];
    const {value, min, max} = metricsEntry;

    metricsEntry.value += length * sign;
    metricsEntry.min = Math.min(min, value);
    metricsEntry.max = Math.max(max, value);
    metricsEntry.size = max - min;
  });
});
const {x: {min: MIN_X },y: {min: MIN_Y}} = METRICS;

/*** PROCESS ***/
const canvas = [[]];
const intersections = [];
// avoid negative coords on canvas
function createPointFromDirection(origin, direction, length) {
  const newPoint = {...origin};
  const [coordsProp, sign] = DIRECTIONS[direction];
  newPoint[coordsProp] += length * sign;
  return newPoint;
}
function isIntersecting(canvas, point, line){
  const {x, y} = point;
  const pointOnCanvas = (canvas[y] && canvas[y][x]);
  const isForeignIntersection = pointOnCanvas && pointOnCanvas.line !== line;
  isForeignIntersection && intersections.push([pointOnCanvas, point]);
  return isForeignIntersection;
}
function drawPoint(canvas, point, line) {
  point.line = line;
  point.step = ++line.steps;
  const {x, y} = point;
  canvas[y] || ( canvas[y] = [] );

  isIntersecting(canvas, point, line);
  canvas[y][x] = point;
}
function drawLine(canvas, p1, p2, line) {
  let {x: x1, y: y1} = p1;
  let {x: x2, y: y2} = p2;

  const xDir = x2 < x1 ? -1 : 1;
  while(x1 !== x2){
    x1 += xDir;
    drawPoint(canvas, createPoint(x1, y1), line)
  }

  const yDir = y2 < y1 ? -1 : 1;
  while(y1 !== y2){
    y1 += yDir;
    drawPoint(canvas,createPoint(x1, y1), line)
  }
}
function createLine(name) {
  return { name, steps: 0 }
}
function createPoint(x, y, line = {}, step = 0) {
  return { x, y, line, step }
}

const ORIGIN = createPoint(Math.max(0, -MIN_X), Math.max(0, -MIN_Y))
data.forEach((lineInstructions, i) => {
  const line = createLine(i+1);
  lineInstructions.reduce((p1, lineInstruction) => {
    const [direction] = lineInstruction, length = lineInstruction.slice(1);
    const p2 = createPointFromDirection(p1, direction, length);
    drawLine(canvas, p1, p2, line);
    return p2;
  }, ORIGIN);
});

/*** FIND CLOSEST INTERSECTION ***/
const [sumOfLeastStepsIntersection] = intersections
.map(([p1, p2]) => p1.step + p2.step)
.sort((a,b) => a-b);

console.log(sumOfLeastStepsIntersection); // 35194


