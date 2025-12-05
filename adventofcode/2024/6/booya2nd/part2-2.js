let text = require('fs').readFileSync('input.txt', 'utf8').trim();
let start = text.indexOf('^'); text = text.replace('^', '.');
const w = text.indexOf('\n') + 1;

const dir = [[0, -1], [1, 0], [0, 1], [-1, 0]];

// Function to simulate guard's movement
function simulateGuard(startPos, startDir, obstaclePos) {
  let pos = startPos, d = startDir;
  const visited = new Set([pos]);
  const maxSteps = text.length; // Prevent infinite loops

  for (let step = 0; step < maxSteps; step++) {
    let next = pos + dir[d][0] + dir[d][1] * w;
    if (next === obstaclePos || text[next] === '#') {
      d = (d + 1) % 4;
    } else {
      pos = next;
      visited.add(pos);
    }
    if (visited.size === originalPathLength) return true; // Loop detected
  }
  return false; // No loop
}

// Calculate original path length
let pos = start, d = 0;
const originalPath = new Set([pos]);
while (true) {
  let next = pos + dir[d][0] + dir[d][1] * w;
  if (text[next] === '#') {
    d = (d + 1) % 4;
  } else if (text[next] === '.') {
    pos = next;
    if (!originalPath.add(pos)) break; // Loop detected
  } else {
    break; // Out of bounds
  }
}
const originalPathLength = originalPath.size;

// Find possible obstruction positions
const possibleObstructions = new Set();
for (let pos = 0; pos < text.length; pos++) {
  if (text[pos] === '.' && !originalPath.has(pos)) {
    if (simulateGuard(start, 0, pos)) {
      possibleObstructions.add(pos);
    }
  }
}

console.log("Part 2:", possibleObstructions.size);