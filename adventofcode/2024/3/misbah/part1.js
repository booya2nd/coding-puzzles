function readFile() {
  const text = require("fs").readFileSync("input.txt", "utf8").trim();
  return text;
}

function parseString(input) {
  const pattern = /mul\(\d{1,3},\d{1,3}\)/g;

  const matches = input.match(pattern);
  let sum = 0;

  matches.forEach((element) => {
    const match = element.match(/\d+/g);
    if (match) {
      sum = sum + parseInt(match[0]) * parseInt(match[1]);
    }
  });

  console.log(sum);
}
const inputString = readFile();
parseString(inputString);
