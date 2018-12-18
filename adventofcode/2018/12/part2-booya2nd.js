(() => {
  const input = document.body.textContent.trim();
  const [initialState, rulesInput] = input.match(/:(.*)\n([\s\S]+)/).slice(1).map(s => s.trim());
  const offs = '.'.repeat(10);
  const initial = offs + initialState;

  const rules = rulesInput.trim().split('\n').map(ruleInput => {
    const [,pattern, result] = ruleInput.match(/(.*?) => (.)/);
    return {pattern, result};
  });

  function renderGeneration(input){
    let output = '';
    input = input.padEnd(input.lastIndexOf('#')+5, '.');
    for (let i=0,l=input.length;i<l;i++){
      let chr = '.', sub = input.substring(i-2,i+3);
      rules.some(({pattern, result}) => {
        const match = sub === pattern;
        match && (chr = result);
        return !!match;
      });
      output += chr;
    }
    return output;
  }

  function count(output){
    let sum = 0;
    output.replace(/#/g, (x,i) => sum += i-offs.length);
    return sum;
  }

  function calculateGeneration(n){
    let diffs=[], results = [], isRecurring, output=initial, i=0;
    while (!isRecurring && i++<n) {
      output = renderGeneration(output);
      results.unshift(count(output));
      diffs.unshift(Math.abs(results[0] - (results[1]||0)));
      // two consecutively equal `diffs` means `recurrence` (at least high probability)
      isRecurring = diffs[0] === diffs[1];
    }
    return isRecurring
      ? results[0] + (n - i) * diffs[0]
      : results[0];
  }

  return {
    20: calculateGeneration(20),
    50e9: calculateGeneration(50e9),
  };
})();
