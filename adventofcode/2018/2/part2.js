function levensthein(a, b){
  var tmp;
  if (a.length === 0) { return b.length; }
  if (b.length === 0) { return a.length; }
  if (a.length > b.length) { tmp = a; a = b; b = tmp; }

  var i, j, res, alen = a.length, blen = b.length, row = Array(alen);
  for (i = 0; i <= alen; i++) { row[i] = i; }

  for (i = 1; i <= blen; i++) {
    res = i;
    for (j = 1; j <= alen; j++) {
      tmp = row[j - 1];
      row[j - 1] = res;
      res = b[i - 1] === a[j - 1] ? tmp : Math.min(tmp + 1, Math.min(res + 1, row[j] + 1));
    }
  }
  return res;
}

const list = document.body.textContent.split('\n');
loop:for(let i=0, l=list.length, match=[]; i<l; i++) {
  for(let j=i; j<l; j++){
    if (levensthein(list[i], list[j]) === 1) {
      match = [list[i], list[j]];
      break loop;
    }
  }
}
[...match[0]].reduce((result, chr, index) => result + (chr === match[1][index] ? chr : ''), ""); // cnjxoritzhvbosyewrmqhgkul
