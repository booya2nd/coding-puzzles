function solution(a,b,c) {
   const s = [a,b,c].sort((a,b) => a-b);
   return s[0] + s[1];
}

const r = solution(2,4,6); // invalid
console.log( r);