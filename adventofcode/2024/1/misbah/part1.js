function readFile() {
  const text = require("fs").readFileSync("input.txt", "utf8").trim();
  return text.split("\n");
}

function structureInput(input) {
  const col1 = [];
  const col2 = [];
  input.forEach((line) => {
    const [first, second] = line.split(/\s+/);
    col1.push(Number(first));
    col2.push(Number(second));
  });

  return { col1: col1.sort(), col2: col2.sort() };
}

function calculateTotalDistance({ col1, col2 }) {
  let totalSum = 0;
  for (i = 0; i < col1.length; i++) {
    let difference = col1[i] - col2[i];
    totalSum = totalSum + Math.abs(difference);
  }
  return totalSum;
}

const rawInput = readFile();

const input = structureInput(rawInput);

const distance = calculateTotalDistance(input);
console.log(distance);
