function canSwap(s1,s2) {
   if (s1.length !== s2.length) return false;
   let diffs = 0;
   for (let i = 0; i < s1.length; i++) {
      if (s1[i] === s2[i]) continue;
      if (s2.indexOf(s1[i]) === -1) return false;
      diffs++;
   }
   return diffs === 2;
}

const r = canSwap('bank', 'kanb'); // invalid
console.log( r);