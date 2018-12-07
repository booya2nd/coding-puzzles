var regex = /(?:(\w)(?=(\1)))|(\#.)/gi;
var replacer = (match, chr1, chr2, hash, ...rest) => {
  if (hash) return ''; // sweep # and following char
  return chr1 !== chr2 ? '#' : match; // mark and sweep
}

function process(input){
  var next = input, current;
  while((current = next) && current !== (next = current.replace(regex, replacer)));
  return current.length;
}

function getStrippedInput(removeChr, input){
  const replacerRegex = new RegExp(`${removeChr}`, 'ig');
  return input.replace(replacerRegex, '');
}

var input = document.body.textContent.trim();
var list = [...Array(26)].map((_,index) => {
  const chr = String.fromCharCode("A".charCodeAt(0) + index);
  console.time(chr);
  const strippedInput = getStrippedInput(chr, input);
  const processed = process(strippedInput);
  console.timeEnd(chr); // some output ... gets boring else
  return [chr, processed];
});

var [winner] = list.sort((a,b) => a[1] - b[1]);
winner; // depends on your input ...
