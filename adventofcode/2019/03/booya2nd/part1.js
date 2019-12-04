/*** INPUT ***/
// const source = document.body.textContent.trim();
const fs = require('fs');
const path = require('path');
let input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8').trim();

const sample1 = `R8,U5,L5,D3
U7,R6,D4,L4`;
const sample2 = `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`;

const source = sample1;
const data = source.split('\n').map(line=>line.split(','));
const DIRECTIONS = { R:[0,+1], L:[0,-1], D:[1,+1], U:[1,-1] };

/*** ANALYZE ***/
const METRICS_ENTRY = {value:0, min:Infinity, max:-Infinity, size:0};
const METRICS = [{...METRICS_ENTRY},{...METRICS_ENTRY}];
data.forEach(entry => {
  entry.forEach((lineInstruction) => {
    const direction = lineInstruction[0], length = lineInstruction.slice(1);
    const [metricsEntryIndex, sign] = DIRECTIONS[direction];
    const metricsEntry = METRICS[metricsEntryIndex];
    const {value, min, max} = metricsEntry;

    metricsEntry.value += length * sign;
    metricsEntry.min = Math.min(min, value);
    metricsEntry.max = Math.max(max, value);
    metricsEntry.size = max - min;
  });
});
const [{min: MIN_X },{min: MIN_Y}] = METRICS;

/*** PROCESS ***/
const canvas = [[]];
const intersections = [];
// avoid negative coords on canvas
const ORIGIN = [Math.max(0, -MIN_X), Math.max(0, -MIN_Y)];
function createPoint(origin, direction, length) {
  const point = [...origin];
  const [pointIndex, sign] = DIRECTIONS[direction];
  point[pointIndex] += length * sign;
  return point;
}
function isIntersecting(canvas, point, lineType){
  const [x, y] = point;
  const value = canvas[y] && canvas[y][x];
  const isForeignIntersection = value && value !== lineType;
  isForeignIntersection && intersections.push(point);
  return isForeignIntersection;
}
function drawPoint(canvas, point, lineType) {
  const [x, y] = point;
  canvas[y] || ( canvas[y] = [] );
  canvas[y][x] = isIntersecting(canvas, point, lineType) ? 'x' : lineType;
}
function drawLine(canvas, p1, p2, lineType) {
  let [x1, y1] = p1;
  let [x2, y2] = p2;

  const xDir = x2 < x1 ? -1 : 1;
  while(x1 !== x2){ x1 += xDir; drawPoint(canvas,[x1, y1], lineType) }

  const yDir = y2 < y1 ? -1 : 1;
  while(y1 !== y2){ y1 += yDir; drawPoint(canvas,[x1, y1], lineType) }
}
data.forEach((lineInstructions, i) => {
  const lineType = i+1;
  lineInstructions.reduce((p1, lineInstruction) => {
    const [direction] = lineInstruction, length = lineInstruction.slice(1);
    const p2 = createPoint(p1, direction, length);
    drawLine(canvas, p1, p2, lineType);
    return p2;
  }, ORIGIN);
});

console.table(canvas);
console.log(intersections);
// IDEAS:
// - we will need to "draw"; crossing can happen anytime
// - use 2d-array to store/draw
// -- store path of line1 as 1 and line2 as 2 ("selfintersection" should not count; needs distinction)
// ---- draw(canvas: [[]], p1: Point [x,y], p2: Point [x,y], lineType: int);
// ------
// -- array size is unknown 🤔 + points can be in negative coords
// ---- suboptimal: analyze R/D Min/Max & U/D Min/Max
// ---- optimal?: expand&shift array data



