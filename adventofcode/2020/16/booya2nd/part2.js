const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n\n')

let [rules, yours, nearbys] = input;
rules=rules.split('\n').reduce((acc, str) => {
  const [,name, ...ranges] = str.match(/([ \w]+): (\d+-\d+) or (\d+-\d+)/);
  acc[name] = ranges.map(range => range.split('-').map(Number));
  return acc;
}, {});
yours=yours.split('\n').slice(1).map(nums => nums.split(',').map(Number));
nearbys=nearbys.split('\n').slice(1).map(nums => nums.split(',').map(Number));
const allTickets = [].concat(yours,nearbys);
const rulesArr = Object.entries(rules);

function checkRule(rule, num){
  const [min, max] = rule;
  return num >= min && num <= max;
}

const validTickets = allTickets.filter(ticket =>
  ticket.every((numberInTicket) =>
    rulesArr.some(([,rules]) => rules.some(rule => checkRule(rule, numberInTicket)))
  )
);

// ForEach validTicket
//   ForEach number on that ticket
//    check which rules are not applying (majority cases are too graceful and match everything)
const evidence = validTickets.flatMap(ticket => {
  return ticket.flatMap((numberInTicket, index) => {
    return rulesArr.map(([name, rules]) => {
      const matches = rules.some(rule => checkRule(rule, numberInTicket));
      return {name, matches, index, numberInTicket};
    }).filter(({ matches }) => !matches);
  })
});

// cross-off-logic
const keys = Object.keys(rules);
const crossoff = keys.map(() => new Set(keys)); // nXn matrix
// delete all non-matching cases
evidence.forEach(({ name, index }) => crossoff[index].delete(name));
// remove all duplicates of resolved positions
let resolved = [];
const getResolved = () => crossoff.filter(({size}) => size === 1);
const deleteEntry = val => crossoff.forEach(set => set.size > 1 && set.delete(val));

let MAX = 100;
while(MAX-->0 && (resolved = getResolved()) && resolved.length !== keys.length) {
  resolved.forEach(set => deleteEntry(Array.from(set)[0]));
}

// map to your ticket
const yourTicket = Object.fromEntries(
  crossoff.flatMap(set => Array.from(set)).map(
    (field, index) => [field, yours[0][index]]
  )
);

// multiply 'departure*' fields
const answer = Object.entries(yourTicket).reduce((acc, [field, val]) => {
  return /departure/.test(field) ? acc * val : acc;
}, 1)

console.log(
  yourTicket,
  answer
);



