const md5 = require('md5-jkmyers');
const input = 'bgvyzdsv';

let i=0;
while (!md5(`${input}`+ (++i)).startsWith('00000')) {}

console.log(i);
