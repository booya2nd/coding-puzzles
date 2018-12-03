function createMatrix(w,h, fill = 0){
  return new Array(w).fill(fill).map(x => new Array(h).fill(fill));
}

const surface = createMatrix(1e3, 1e3);
const overlaps = createMatrix(1e3, 1e3);
function draw(rectData, surface) {
  let {left, top, width, height} = rectData;
  left*=1; top*=1; width*=1; height*=1;
  for (let x=0; x<width; x++){
    for (let y=0; y<height; y++){
      if (++surface[left+x][top+y] > 1) {
        overlaps[left+x][top+y] = 1;
      }
    }
  }
}

// draw
document.body.textContent.trim().split('\n')
.forEach((str) => {
  const rectData = str.match(/#(?<id>\d+) @ (?<left>\d+),(?<top>\d+): (?<width>\d+)x(?<height>\d+)/).groups;
  draw(rectData, surface);
});
// analyze rects
overlaps.reduce((sum, cols) => cols.reduce((xsum, cell) => xsum + cell, sum), 0); // 111485
