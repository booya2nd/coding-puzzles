
function solution(text, brokenkeys) {
    return text.split(' ').filter(w => !w.match(new RegExp('['+brokenkeys+']'))).length
}
// input doesnt match task
const r = solution(
 'Hello there World', 'ed'
);
console.log( r);