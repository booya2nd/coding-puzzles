const charCounts = [,,0,0];
document.body.textContent.split('\n')
.forEach((str) => {
  const storedCount = [...charCounts];
  const matches = [...str].sort().join('').match(/(\w)\1+/g) || [];
  matches.forEach(({length}) => charCounts[length] = storedCount[length]+1);
});
charCounts[2] * charCounts[3]; // 7410
