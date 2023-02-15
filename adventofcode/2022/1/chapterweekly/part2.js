const { readFileSync } = require('node:fs');
const text = readFileSync('./input.txt', 'utf8');

console.log(text);
let max=[],c=0;
const splitted = text
  .split("\n")
  .map(n => n?(c+=n*1):(max.push(c),c=0))
  .sort((a,b) => b-a)
  .slice(0,3)
  .reduce((a,b)=>a+b)

console.log(splitted);

// Code Golf
// let max=0,c=0;
// const splitted = text
//   .split("\n")
//   .map(n => n?(c+=n*1):(max=Math.max(c,max,c=0)))

// Saved working 2nd approach:
// const splitted = text
//   .split("\n\n")
//   .forEach(e => {
//     const something = e.split("\n")
//       .reduce((acc, cur) => acc + Number(cur), 0)
//     max = Math.max(max, something)
//   })

// Saved working 1st approach:
// const splitted = text
//   .split("\n\n")
//   .map(e => e.split("\n")
//     .reduce((acc, cur) => acc + Number(cur), 0)
//   )
