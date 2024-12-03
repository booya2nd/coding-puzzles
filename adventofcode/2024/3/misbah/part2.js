function readFile() {
  const text = require("fs").readFileSync("input.txt", "utf8").trim();
  return text;
}

function parseString(input) {
  const pattern = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;

  const matches = input.match(pattern);
  let sum = 0;
  let allowed = true;

  matches.forEach((element) => {
    if (element === "do()") {
      allowed = true;
    } else if (element === "don't()") {
      allowed = false;
    }

    const match = allowed ? element.match(/\d+/g) : null;

    if (match) {
      sum = sum + parseInt(match[0]) * parseInt(match[1]);
    }
  });

  console.log(sum);
}
const inputString = readFile();
parseString(inputString);
