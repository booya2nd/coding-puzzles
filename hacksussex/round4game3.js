
function solution(nums) {
    const r = [[],[]];
    nums.forEach((n,i) => r[i%2].push(n));
    const inc = (a,b) => a-b;
    const dec = (a,b) => b-a;

    r[0].sort(inc);
    r[1].sort(dec);

    return nums.map((_,i) => r[i%2].shift());
}
// input doesnt match task
const r = solution(
 [4,1,2,3] // 2,3,4,1
);
console.log( r);
