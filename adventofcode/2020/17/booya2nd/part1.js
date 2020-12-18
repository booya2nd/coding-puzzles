const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n')

const OFFS = 1e3;
const $ = v => v+OFFS;
const $$ = v => v-OFFS;
const C=[-1,0,1], CHECKS=C.map(z=>C.map(y=>C.map(x=>[x,y,z]))).flat(2);
function getAdjacent(state, find, [x, y, z]) {
  return CHECKS.reduce((acc, [xi,yi,zi]) => {
    if (xi || yi || zi) {
      const v = state?.[z+zi]?.[y+yi]?.[x+xi];
      if (v === find) acc.push([x+xi, y+yi, z+zi]);
    }
    return acc;
  }, [])
}

let state = [];
input.forEach((line, y) => {
  line.split('').forEach((c, x) =>
    ((state[$(0)] ||= [])[$(y)] ||= [])[$(x)] = c
  );
});

function copyArr(arr){
  return arr.map(v => Array.isArray(v) ? copyArr(v) : v);
}
function gen(state) {
  const newState = copyArr(state);
  state.forEach((_, z) => {
    _.forEach((_, y) => {
      _.forEach((v, x) => {
        let newV;
        const a = getAdjacent(state, '#', [x, y, z]);
        const activeCount = a.length;
        console.log({v, coords: [x,y,z].map($$), '#':a.map(c => c.map($$))});
        switch(v) {
          case '#': newV = (activeCount === 2 || activeCount === 3) ? '#' : '.'; break;
          case '.': newV = activeCount === 3 ? '#' : '.'; break;
        }
        newState[z][y][x] = newV;
      })
    })
  });
  return newState;
}

function join2(arr, sep) {
  return arr.reduce((str, v) => str + (sep ? `${v}${sep}` : `${v}`), '');
}

function draw(state) {
  const str = join2(
    state.map((z,i) => {
      return `z:${i-OFFS}\n`+join2(z.map(y => join2(y,'')),'\n')
    }), '\n');
  console.log(str);
}


let i=0;
draw(state);
while(++i < 5) {
  const prevState = state;
  state = gen(state);
  // if (prevState+'' === state+'') break;
  console.log(`\n\n GEN ${i}>`);
  draw(state);
}

// d = ((x2 - x1)**2 + (y2 - y1)**2 + (z2 - z1)**2)**.5



