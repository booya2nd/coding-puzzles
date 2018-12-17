(() => {
  const [initialState, rulesInput] = document.body.textContent.trim().match(/:(.*)\n([\s\S]+)/).slice(1).map(s => s.trim());
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

  function renderGenerations(n){
    let output = initial;
    while(n-->0) output = renderGeneration(output);
    return output;
  }

  function count(output){
    let sum = 0;
    output.replace(/#/g, (x,i) => sum += i-offs.length);
    return sum;
  }

  // render && analyze higher numbers:
  return [
    count(renderGenerations(20)),
    count(renderGenerations(50)),
    count(renderGenerations(100)),
    count(renderGenerations(110)),
    count(renderGenerations(120)),
    count(renderGenerations(200)),
  ]
})(); // [3248, 4658, 8000, 8800, 9600, 16000] ~> 100 gens = 8000
// 50e9 / 100 * 80 = 40000000000
