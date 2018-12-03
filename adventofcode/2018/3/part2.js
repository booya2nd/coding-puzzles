function createMatrix(w,h, fill = 0){
  return new Array(w).fill(fill).map(x => new Array(h).fill(fill));
}

const surface = createMatrix(1e3, 1e3);
const overlaps = createMatrix(1e3, 1e3);
const freeRectCandidates = [];

function draw(rectData, surface) {
  let hasOverlaps = false;
  let {left, top, width, height} = rectData;
  for (let x=0; x<width; x++){
    for (let y=0; y<height; y++){
      if (++surface[top+y][left+x] > 1) {
        overlaps[top+y][left+x] = 1;
        hasOverlaps = true;
      }
    }
  }

  return hasOverlaps;
}

// draw
document.body.textContent.trim().split('\n')
.forEach((str) => {
  const rectData = str.match(/#(?<id>\d+) @ (?<left>\d+),(?<top>\d+): (?<width>\d+)x(?<height>\d+)/).groups;
  Object.keys(rectData).forEach(key => rectData[key] *= 1);
  const hasOverlaps = draw(rectData, surface);
  !hasOverlaps && freeRectCandidates.push(rectData);
});

function extract(source, {left, top, width, height}){
  return source.slice(top, top + height).map(row => row.slice(left, left + width));
}

const hasOverlapsRegex = /[2-9]/;
freeRectCandidates.filter((rectData) => {
  const extraction = extract(surface, rectData);
  const hasOverlaps = !!`${extraction}`.match(hasOverlapsRegex);
  return !hasOverlaps;
}); // [ {id: 113, left: 632, top: 645, width: 27, height: 19} ]
