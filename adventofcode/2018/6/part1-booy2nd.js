var debug =  `
1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
`;

var input = document.body.textContent;

// create index;
var Ω = Infinity;
var index = {x:[], y:[], xValues:[], yValues:[], xMin:Ω, xMax:-Ω, yMin:Ω, yMax:-Ω, distances:new Map};
var points = input.trim().split('\n').map((line, i) => {
  const [x,y] = line.split(', ').map(n => n*1);
  const point = {x,y,name:String.fromCharCode(65+i%26 + (32)*(i/26|0))};
  index.x[x] = point;
  index.y[y] = point;
  index[[x,y]] = point;
  index.xValues.push(x);
  index.yValues.push(y);
  x < index.xMin && (index.xMin = x);
  x > index.xMax && (index.xMax = x);
  y < index.yMin && (index.yMin = y);
  y > index.yMax && (index.yMax = y);
  return point;
});
// add distances to index
// read Distance of PointA and PointF like `index.distances.get(points[0]).get(points[5])`
for (let i=0,l=points.length; i<l; i++){
  for (let j=i+1; j<l; j++){
    const p1 = points[i], p2 = points[j];
    const { distances } = index;
    distances.has(p1) || distances.set(p1, new Map);
    distances.has(p2) || distances.set(p2, new Map);
    const map1 = distances.get(p1);
    const map2 = distances.get(p2);
    const distance = getDistance(p1,p2);
    // debugger;
    map1.set(p2, distance);
    map2.set(p1, distance);
  }
}
function getDistance(p1,p2){
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
}

console.log(index);
// ... now what ...


// draw the thing ... maybe ???
// make reduce font-size in console to see it all ...
(function draw(){
  let out = '';
  const {xMin, xMax, yMin, yMax} = index;
  for(let y=yMin; y<=yMax; y++){
    out += '\n';
    for(let x=xMin; x<=xMax; x++){
      const point = index[[x,y]];
      out += point ? point.name : '.';
    }
  }
  return out + '\n';
})();
