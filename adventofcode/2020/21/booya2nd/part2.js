const input = require('fs').readFileSync('input.txt', 'utf8').trim()

const solved = {};

/*
mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)


*** step 0

mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
                     ⬆               ❓    ❓
❌ trh fvjkl sbzzf mxmxvkd (contains dairy)
❌ sqjhc fvjkl (contains soy)
❌ sqjhc mxmxvkd sbzzf (contains fish)


{nhms:null}

*** step 1

mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
               ⬆1                    ❓    ❓
❌ trh fvjkl sbzzf mxmxvkd (contains dairy)
❌ sqjhc fvjkl (contains soy)
    ⬆1                   👎
🤷 sqjhc mxmxvkd sbzzf (contains fish)
    ⬆1                           👍
           ⬆2                    👍

fish: [sqjhc, mxmxvkd]
{nhms:null, sqjhc:[fish] }

*** step 2

mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
         ⬆1                         ❓    ❓
❌ trh fvjkl sbzzf mxmxvkd (contains dairy)
❌ sqjhc fvjkl (contains soy)
❌ sqjhc mxmxvkd sbzzf (contains fish)

fish: [sqjhc, mxmxvkd]
{nhms:null, sqjhc:[fish], kfcds:null }



*** step 3

mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
   ⬆1                               ❓    ❓
✅ trh fvjkl sbzzf mxmxvkd (contains dairy)
                      ⬆1              👍

allerg {
fish: [sqjhc],
dairy: [mxmxvkd],
soy: []
}

{nhms:null, sqjhc:[fish], kfcds:null, mxmxvkd:[dairy] }

*** step 4




 */

const solved = {};

function stripSolved(input) {
  const regex = new RegExp(Object.entries(solved).flat().join('|'),'g');
  return input.replace(regex, '');
}

function parseInput(input){
  return input.split('\n').reduce((acc, line) => {
    let [,w = '',c = ''] = line.match(/(.*)\(contains (.+)\)/) || [];
    const words = w.trim().split(' ').filter(String);
    const contains = c.trim().split(', ').filter(String);
    words.forEach(word => {
      contains.forEach(cont => {
        ((acc[word]||={})[cont]||=[]).push(1/words.length)
      })
    })
    return acc;
  }, {});
}

const data = parseInput(stripSolved(input));

console.log(data);

const pickI = (arr, i) => arr.splice(i,1);
const pickE = (arr, e) => pickI(arr, arr.indexOf(e));
const pickF = (arr, f) => pickI(arr, arr.findIndex(f));

data.sort((a,b) => a.cont.length - b.cont.length);




/*

// cross-off-logic
const keys = Object.keys(rules);
const crossoff = keys.map(() => new Set(keys)); // nXn matrix
// delete all non-matching cases
evidence.forEach(({ name, index }) => crossoff[index].delete(name));
// remove all duplicates of resolved positions
let resolved = [];
const getResolved = () => crossoff.filter(({size}) => size === 1);
const deleteEntry = val => crossoff.forEach(set => set.size > 1 && set.delete(val));

*/
