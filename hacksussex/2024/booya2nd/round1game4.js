function square(rectangles) {
   const mins = rectangles.map(r => Math.min(...r));
   const s = Math.max(...mins);
   return mins.filter(m => m >= s).length;
}

const r = square([[5,8],[3,9],[5,12],[16,5]]); // invalid
console.log( r);