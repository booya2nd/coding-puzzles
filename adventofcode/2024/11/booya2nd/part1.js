const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const stones = text.split(' ');

let blinks = 25;
while(blinks-->0) {
  let o = 0;
  [...stones].forEach((stone,i)=>{
    let j=i+o, l = (stone+'').length;
    switch(true){
      case stone==0: stones[j] = 1; break;
      case l%2==0: stones.splice(j,1,+(stone+'').slice(0,l/2),+(stone+'').slice(l/2));o++;break;
      default: stones[j] = stone*2024
    }
  });
}

console.log(stones.length);
