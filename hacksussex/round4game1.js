
function solution(nums) {
    return new Set(nums.filter(n => n>0)).size;
}
// input doesnt match task
const r = solution(
 [1,2,3,40,50,6,117]
);
console.log( r);