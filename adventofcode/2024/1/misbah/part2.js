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

function similarityScore({ col1, col2 }) {
  let similarityScore = {};

  col1.forEach((item) => {
    if (!similarityScore[item]) {
      similarityScore[item] = { arr1Count: 1, arr2Count: 0 };
    } else {
      similarityScore[item].arr1Count = similarityScore[item].arr1Count + 1;
    }
  });

  col2.forEach((item) => {
    if (similarityScore[item]) {
      similarityScore[item].arr2Count = similarityScore[item].arr2Count + 1;
    }
  });

  let total = 0;
  Object.keys(similarityScore).forEach((num) => {
    const { arr1Count, arr2Count } = similarityScore[num];
    total = total + arr1Count * arr2Count * Number(num);
  });

  return total;
}

const rawInput = readFile();

const input = structureInput(rawInput);

const score = similarityScore(input);
console.log(score);
