((input) => {
  const RENDER = ['⬛', '⭐']; // ['.','#'];
  function intersect(p1,p2) {
    var d = 1e5;
    const x1=p1.x, y1=p1.y, x2=p1.x+p1.vx*d, y2=p1.y+p1.vy*d;
    const x3=p2.x, y3=p2.y, x4=p2.x+p2.vx*d, y4=p2.y+p2.vy*d;
    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) return false;
    const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    // Lines are parallel
    if (denominator === 0) return false;
    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;
    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return false;
    // Return a object with the x and y coordinates of the intersection
    const x = x1 + ua * (x2 - x1);
    const y = y1 + ua * (y2 - y1);

    return {x, y}
  }

  function createVector(pointInput){
    const [,x,y,vx,vy] = pointInput.match(/\< *(-?\d+), *(-?\d+)\>.*\< *(-?\d+), *(-?\d+)\>/);
    return {x:x*1,y:y*1,vx:vx*1,vy:vy*1};
  }
  function move(vector, steps) {
    return { x: vector.x + vector.vx * steps, y: vector.y + vector.vy * steps }
  }
  function distance(p1, p2) {
    return Math.sqrt((p2.x - p1.x)**2 + (p2.y - p1.y)**2)
  }
  function renderCandidate([step, candidate]) {
    console.group(step);
    const { area, pointsMap } = candidate;
    let stdout = '';
    for (let y=area.yMin-1; y<=area.yMax+1; y++) {
      for (let x=area.xMin-1; x<=area.xMax+1; x++) {
        stdout += RENDER[!!pointsMap[`${x}x${y}`]*1];
      }
      stdout += '\n';
    }
    console.log(stdout);
    console.groupEnd();
  }

  const Ω = Infinity, α = Math.round;
  const points = input.trim().split('\n').map(createVector);
  const p0 = points[0];
  const p0intersections = points.slice(1).map(p => intersect(p0,p)).filter(i => !!i);
  //- map intersections and calculate after how many steps the intersection occurs
  //- from the map deduce a range where the points are closest to each other
  const range = [Ω, -Ω];
  p0intersections.forEach(i => {
    const steps = (i.x-p0.x)/p0.vx;
    range[0] = Math.min(range[0], steps);
    range[1] = Math.max(range[1], steps);
  });
  //- use range to find the sweetspot with many candidates of adjacent points in range of 1'ish
  const candidates = {};
  for (let step=range[0]; step<=range[1]; step++) {
    const enclosed=[], area={xMin:Ω,yMin:Ω,xMax:-Ω,yMax:-Ω};
    const p0 = move(points[0], step);
    const pN = points.slice(1).map(p => {
      const p1 = move(p, step), dist = distance(p0, p1);
      if (dist <= 1) enclosed.push(dist);
      const n = { ...p1, x: α(p1.x), y: α(p1.y)}
      area.xMin = Math.min(area.xMin, n.x);
      area.yMin = Math.min(area.yMin, n.y);
      area.xMax = Math.max(area.xMax, n.x);
      area.yMax = Math.max(area.yMax, n.y);
      return n;
    });
    // store entries only with close points
    if (enclosed.length) {
      const pointsMap = {};
      [p0].concat(pN).forEach(p => pointsMap[`${p.x}x${p.y}`] = p);
      candidates[step] = { enclosed, area, pointsMap };
    }
  }
  const sortedCandidates = Object.entries(candidates).sort((a,b) => b[1].enclosed.length - a[1].enclosed.length);
  renderCandidate(sortedCandidates[0])
})(document.body.textContent);

// former visual approach:
// see https://codepen.io/Booya/pen/XoXaEr?editors=1111
