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

function checkIfSafe(report) {
  const difference = [];
  let safe = true;

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
      safe = false;
    }
  }

  return safe;
}

function modifyReport(report, index = 0) {
  if (index >= report.length) return false;

  const tempReport = [...report.slice(0, index), ...report.slice(index + 1)];
  const isSafe = checkIfSafe(tempReport);

  if (isSafe) return true;
  return modifyReport(report, index + 1);
}

const input = readFile();

let safeCount = 0;

input.forEach((item) => {
  const report = item.split(" ");
  const safe = checkIfSafe(report);

  let safeByModify;

  if (!safe) {
    safeByModify = modifyReport(report);
  }

  if (safe || safeByModify) safeCount = safeCount + 1;
});

console.log(safeCount);
