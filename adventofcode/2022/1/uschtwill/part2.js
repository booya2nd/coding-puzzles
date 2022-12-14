import { sortedElves } from "./part1.js"

const topThreeSummed = sortedElves.slice(0, 3).reduce((acc, cur) => acc + cur)

console.log(topThreeSummed)
