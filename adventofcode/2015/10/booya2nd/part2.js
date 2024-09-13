const input = '1113122113';

function count(n){
  return [...`${n}`.matchAll(/(\d)\1*/g)].map(
    ([m,n]) => `${m.length}${n}`
  ).join('')
}

let result = input;
let i= 50;
while(i-->0) result = count(result);

console.log(result.length);