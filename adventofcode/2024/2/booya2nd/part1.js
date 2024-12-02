const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n');

let result = input
    .map(l=>l.split(' ').map(n=>+n))
    .filter(n=>{
        let dec=true,inc=true,d=true;
        n.every((v,i)=> !n[i+1]||(
            dec&&=v>n[i+1],inc&&=v<n[i+1],d&&=Math.abs(v-n[i+1])<=3,
            dec||inc||d
        ));
        return d&&(dec||inc);
    }).length;

console.log(result);
