var useTestInput = false;
var debug =  `
1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
`;

var threshold = useTestInput ? 32 : 1e4;
var input = useTestInput ? debug : document.body.textContent;

// create index;
// NOTE: contains a lot of nonsense - will se what I can throw away after part2
var Ω = Infinity;
var index = {xMin:Ω, xMax:-Ω, yMin:Ω, yMax:-Ω};
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

function isFine(dest, threshold){
  let sum = 0;
  return points.every(point => (sum+=getDistance(dest,point))<threshold);
}

var area = 0;
// draw the thing ... maybe ???
// make reduce font-size in console to see it all ...

var output = (function draw(){
  let out = '';
  const {xMin, xMax, yMin, yMax} = index;
  for(let y=yMin; y<=yMax; y++){
    out += '\n';
    for(let x=xMin; x<=xMax; x++){
      const point = index[[x,y]];
      const fine = isFine({x,y}, threshold) && (++area);
      if (point) out += point.name;
      else {
        out += fine ? '#' : '.';
      }
    }
  }
  return out + '\n';
})();

console.log(area); // 39930
console.log(output);
