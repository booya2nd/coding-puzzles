import fs from "fs"
const data = fs.readFileSync("input.txt", "utf8")

export const sortedElves = data
  .split("\n\n")
  .map(elf => elf.split("\n"))
  .map(elf => +elf.reduce((acc, cur) => +acc + +cur))
  .sort((a, b) => b - a)

console.log(sortedElves[0])
