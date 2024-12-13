const text=require('fs').readFileSync('input.txt', 'utf8').trim();
console.time();
const input = [...text.matchAll(/X.(\d+).*?(\d+)\n.*?(\d+).*?(\d+)\n.*?(\d+).*?(\d+)/g)];
let tokens=0;

for (const [_, ...i] of input) {
  let [xA, yA, xB, yB, x, y]=i.map(Number), det=xA*yB - yA*xB;
  if (!det) continue;
  const A = (x*yB - y*xB) / det;
  const B = (-x*yA + y*xA) / det;

  if (A>=0 && B>=0 && A===(A|0) && B===(B|0)) tokens+=A*3+B;
}

console.timeEnd();
console.log(tokens);