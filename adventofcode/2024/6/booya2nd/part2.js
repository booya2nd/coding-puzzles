let text = require('fs').readFileSync('input.txt', 'utf8').trim(),_text=text;
console.time('init');
let i= text.indexOf('^'),__i=i; text=text.replace('^','.');
const w = text.indexOf('\n')+1;
let n=i, d=0, dir=[[0,-1],[1,0],[0, 1],[-1,0]], l=0, O=[];
const steps = {};
const DEBUG = false;

const next = (i,inc,psia,l=psia.length) => {
  for(let c=i,x; inc>0?c<l:c>=0; c+=inc) if(x=psia[c]) return x;
}

function pos(i){ return {x:i%w, y:i/w|0} }
function chr(i){ return [(i/w|0)+1,(i%w)+1]+'' }

const loop = i => {
  pos;chr;
  let r=(d+1)%4, o=dir[r][0]+dir[r][1], axis=+!!dir[d][1], p=[i%w, i/w|0], psia=steps[r]?.[axis]?.[p[axis]]??[];
  let inc=o*[1,w][+!!dir[r][1]];
  let ni = i+(dir[d][0]+dir[d][1])*[1,w][+!!dir[d][1]];
  const debug_psia = Object.fromEntries(Object.entries(psia).map(([i,v])=>[chr(i),v]));
  const pia = !!psia?.[i] || next(i,inc,psia) > 0;
  if (pia) {
    O.push(i+(dir[d][0]+dir[d][1])*[1,w][+!!dir[d][1]]);
  }
  l += +pia;


  //q&&Object.keys(q).some((i,v)=>((v=q[i],i===n)?(w[1]=v):w[1]?(w[2]=v):(w[0]=v))&&w[2])
  // steps[r]?.[xy]?.[p[xy]]?.at(0);
  // debug
  if (DEBUG) {
    const _text=[...text]; _text[i]=['^','>','v','<'][d]
    console.log(_text.join(''));
    console.log({
      position:p,
      coords: {x:p[0], y:p[1]},
      index: i,
      direction: {
        index: d,
        coords: dir[d],
        direction: ['up','right','down','left'][d],
        axis: 'xy'[+!!dir[d][1]]
      },
      directionRight: {
        index: r,
        coords: dir[r],
        direction: ['up','right','down','left'][r],
        axis: 'xy'[+!!dir[r][1]]
      },
      [`steps[${d}][0:x][${p[0]}][${i}]`]: i,
      [`steps[${d}][1:y][${p[1]}][${i}]`]: i,

      inPath: steps[r]?.[axis]?.[p[axis]],
      pointsInAxis: psia,
      pointInAxis: pia
    });
  }

  void(0);
};

const store = (i,v=i) => {
  const p=[i%w, i/w|0];
  steps[d]||=[{},{}]; // x,y
  // array for insertion order!
  // 2.9ms
  (steps[d][0][p[0]]||=[])[i]=v;
  //! 5.1ms
  (steps[d][1][p[1]]||=[])[i]=v;
  if (v>0){
    draw(i, false);
    i;
  }
}

function draw(i,write=true){
  _text=_text.split('');
  _text[i]='↑→↓←'[d];
  O.forEach((pos, i)=>_text[pos]=i.toString(36));
  _text[__i]='^';
  _text=_text.join('');
  require('fs').writeFileSync('output.txt',_text,'utf8');
  return _text;
}

[...text.matchAll(/#/g)].map(({index:i})=>dir.map((_,_d)=>{d=_d;store(i,-1)}));d=0;
const a = {'#':_=>d=++d%4, '.':n=>{store(i=n),loop(i)} };
console.timeEnd('init');

console.time('run');
while (text[n] in a) {
  a[text[n]]?.(n);
  n = i + dir[d][0] + dir[d][1]*w;
}
console.timeEnd('run'); // only counts direct intersections
draw(i);
console.log(chr(i));
console.log(l);


