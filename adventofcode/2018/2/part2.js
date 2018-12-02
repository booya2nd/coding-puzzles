function hasOneCharDifference(a, b){
  if (a === b) return false;
  for(let i=0, l=a.length, count=0; i<l; i++) {
    count += a[i] !== b[i];
    if (count > 1) return false;
  }
  return true;
}

const list = document.body.textContent.split('\n');
let match = [];
loop:for(let i=0, l=list.length; i<l; i++) {
  for(let j=i; j<l; j++){
    if (hasOneCharDifference(list[i], list[j])) {
      match = [list[i], list[j]];
      break loop;
    }
  }
}

[...match[0]].reduce((result, chr, index) => result + (chr === match[1][index] ? chr : ''), ""); // cnjxoritzhvbosyewrmqhgkul
