function readFile() {
  const text = require("fs").readFileSync("input.txt", "utf8").trim();
  return text.split("\n");
}

function analysePatern(diff) {
  if (diff < 0) {
    return "dec";
  } else if (diff > 0) {
    return "inc";
  } else return null;
}

function checkIfSafe(str) {
  const report = str.split(" ");
  const difference = [];

  for (i = 0; i < report.length - 1; i++) {
    let diff = report[i] - report[i + 1];
    difference.push(diff);
  }

  const initPattern = analysePatern(difference[0]);

  for (i = 0; i < difference.length; i++) {
    const pattern = analysePatern(difference[i]);

    if (
      pattern != initPattern ||
      ![1, 2, 3].includes(Math.abs(difference[i]))
    ) {
      return null;
    }
  }

  return "safe";
}

const input = readFile();

let safeCount = 0;

input.forEach((item) => {
  const result = checkIfSafe(item);

  if (result == "safe") safeCount = safeCount + 1;
});

console.log(safeCount);
