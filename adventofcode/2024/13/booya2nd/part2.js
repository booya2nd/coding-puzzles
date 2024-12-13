const text=require('fs').readFileSync('input.txt', 'utf8').trim();
console.time();
const input = [...text.matchAll(/X.(\d+).*?(\d+)\n.*?(\d+).*?(\d+)\n.*?(\d+).*?(\d+)/g)];
const tokens=[];
const off = 10000000000000;
for (const [_, ...i] of input) {
  let [xA, yA, xB, yB, _x, _y]=i.map(Number), det=xA*yB - yA*xB;
  const x = _x + off, y = _y + off;
  if (det === 0) continue;
  const A = (x*yB - y*xB) / det;
  const B = (-x*yA + y*xA) / det;

  if (A>=0 && B>=0 && Number.isInteger(A) && Number.isInteger(B)) tokens.push(A*3 + B);
}

console.timeEnd();
console.log(tokens.reduce((a,b)=>a+b));