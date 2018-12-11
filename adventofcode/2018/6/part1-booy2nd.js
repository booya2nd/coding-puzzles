var useTestInput = !false;
var debug =  `
1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
`;

var input = useTestInput ? debug : document.body.textContent;

// create index;
// NOTE: contains a lot of nonsense - will se what I can throw away after part2
var Ω = Infinity;
var index = {x:[], y:[], xMin:Ω, xMax:-Ω, yMin:Ω, yMax:-Ω, isFinite:new Map};
var points = input.trim().split('\n').map((line, i) => {
  const [x,y] = line.split(', ').map(n => n*1);
  const point = {area:1, x,y,name:String.fromCharCode(65+i%26 + (32)*(i/26|0))};
  index[[x,y]] = point;
  x < index.xMin && (index.xMin = x);
  x > index.xMax && (index.xMax = x);
  y < index.yMin && (index.yMin = y);
  y > index.yMax && (index.yMax = y);
  return point;
});

function getDistance(p1,p2){
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
}

function getEdges({x,y}){
  return [{x, y:0}, {x:0, y},{x:index.xMax, y},{x, y:index.yMax}]
}

console.time('finitepoints');
var finitePoints = points.filter(p1 => {
  const isP1ClosestToEdge = getEdges(p1)
  .map(edge => (edge.distance=getDistance(p1,edge),edge))
  .some(edge => { // isfinite if not closest to any edge
    const isAnotherPointCloserToEdge = points.some(p2 => {
      return p2 !== p1 && getDistance(p2, edge) <= edge.distance; // break if p2 is closer to edge
    });
    const p1IsClosestToEdge = !isAnotherPointCloserToEdge;
    return p1IsClosestToEdge;
  });
  const isFinitePoint = !isP1ClosestToEdge;
  isFinitePoint && index.isFinite.set(p1,p1);
  return isFinitePoint;
});
console.timeEnd('finitepoints');

function getClosest(p1){
  return points.map(point => [point, getDistance(p1, point)]).sort((a,b) => a[1]-b[1]);
}

// draw the thing ... maybe ???
// make reduce font-size in console to see it all ...
console.time('draw');
var output = (function draw(){
  let out = '';
  const {xMin, xMax, yMin, yMax} = index;
  for(let y=yMin; y<=yMax; y++){
    out += '\n';
    for(let x=xMin; x<=xMax; x++){
      const point = index[[x,y]];
      if (point) out += point.name;
      else {
        const [c1,c2] = getClosest({x,y});
        if (c1[1] === c2[1]) out += '.';
        else {
          const [p] = c1;
          const isFinite = index.isFinite.has(p);
          p.area++;
          out += isFinite ? p.name.toLowerCase() : 'x';
        }
      }
    }
  }
  return out + '\n';
})();
console.timeEnd('draw');
console.log(finitePoints.sort((a,b) => b.area - a.area));
// { area: 3620, name: "f", x: 166, y: 192}

console.log(output);
