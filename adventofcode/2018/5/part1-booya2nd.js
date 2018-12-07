var regex = /(?:(\w)(?=(\1)))|(\#.)/gi;
var replacer = (match, chr1, chr2, hash, ...rest) => {
  if (hash) return ''; // delete # and following char
  return chr1 !== chr2 ? '#' : match;
}
var next = document.body.textContent.trim(), str;
while((str = next) && str !== (next = str.replace(regex, replacer)));
str.length; // depends on your input ...
