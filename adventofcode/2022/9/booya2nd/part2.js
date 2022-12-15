const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n').map(l => l.split(' '))

const abs = Math.abs;
const S=[...Array(4)].map(() => [0,0])
const tailPos = [];

function draw(pos){
    const posMap = Object.fromEntries(pos.map((v,i) => [v,i+1]));
    const [w,h] = [6,6];

    const canvas = [];
    for (let y=0; y<h; y++) {
        canvas.push([]);
        for (let x=0; x<w; x++) {
            canvas.at(-1).push(posMap[[x,y]] || '.');
        }
    }

    console.log(canvas.map(l => l.join('')).join('\n'),'\n');
}

const POS = { U:[1,1],D:[1,-1],L:[0,-1],R:[0,1] };
for (let k=0; k<input.length; k++) {
    const [dir,steps] = input[k];
    const [i, offs] = POS[dir];
    console.log({ dir, steps });
    for (let step=0; step<steps*1; step++) {
        S[0][i] += offs;

        console.log('============');
        for (let j=0; j<S.length-1; j++) {
            console.log('==', `${dir}${steps} (${step+1}/${steps}) -> [${j+1}]`, '==');
            const [H,T] = [S[j], S[j+1]];
            const [dx,dy] = [H[0]-T[0], H[1]-T[1]];

            dx > 1 && T[0]++;
            dx < -1 && T[0]--;
            dy > 1 && T[1]++;
            dy < -1 && T[1]--;
            abs(dy) > 1 && dx && (T[0]=H[0]);
            abs(dx) > 1 && dy && (T[1]=H[1]);

            console.log(Object.fromEntries(S.map((c,i) => [i+1, c])));
            draw(S);
        }

        // console.log(S.map(([x,y]) => `x:${x} y:${y}`));

        tailPos.push(S.at(-1)+'');
    }
}

console.log( tailPos );
