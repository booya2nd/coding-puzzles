function hasAllNumbers(arr) {

    for (nums of arr) {
       const len = nums.length;
       nums.sort((a,b) => a-b);
       for (let i=0; i<len; i++) {
           if (nums[i] !== i+1) return false;
       }
    }
    return true;
}

const r = hasAllNumbers([[1,2,3,4],[2,3,1],[2,1,3]]); // not perfect
console.log( r);