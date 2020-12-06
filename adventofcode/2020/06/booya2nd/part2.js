const input = require('fs').readFileSync('input.txt', 'utf8').trim().split(/\n\n/);

const results = input.map((group) => {
  const choices = {};
  const participants = group.split('\n');
  participants.forEach(chrs => {
    for (let chr of chrs) {
      choices[chr] ||= 0;
      ++choices[chr];
    }
  })

  return Object.entries(choices).filter(([, count]) => count === participants.length).length
});

console.log(results.reduce((a,b) => a+b));
