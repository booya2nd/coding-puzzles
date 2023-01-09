const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n');

const sum = arr => arr.reduce((a,b) => a+b,0);
const SNAFU_DIGIT = { 3:'=', 4:'-', '=':-2, '-':-1 };
const snafu2dec = snafu => sum(snafu.split('').reverse().map((d,i) => (SNAFU_DIGIT[d] || d * 1) * 5 ** i));
const dec2snafu = n => {
    let d,s,r='';
    do {
        if(s=SNAFU_DIGIT[d=n%5]){ d=s; n+=5; }
        r=d+r;
    } while(n=Math.floor(n/5))

    return r;
};

console.log(
    dec2snafu(
        sum(input.map(snafu2dec))
    )
);
