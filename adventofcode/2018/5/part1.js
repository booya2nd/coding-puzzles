const fs = require('fs');
const path = require('path');

const process = (input) => {
  let processed = '';
  let changed = false;

  for (let i = 0; i < input.length; i++) {
    if (i == (input.length -1)) {
      processed +=  input[i];
    } else {
      const curItem = input[i];
      const nextItem = input[i+1];

      if (curItem.toLowerCase() === nextItem.toLowerCase()) {
        if (curItem !== nextItem) {
          changed = true;
          i += 1;
        }
        else {
          processed += curItem;
        }
      } else {
        processed += curItem;
      }
    }
  }

  return { changed, processed };
}

const main = (example) => {
  let input;
  if (!example) input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
  else input = example;

  let changed = false;
  let processed = input;
  do {
    const result = process(processed);
    
    changed = result.changed;
    processed = result.processed;

  } while (changed);

  console.log('result: ', processed);
  console.log('len:', processed.length)
}

main('aA');
main('abBA');
main('abAB');
main('aabAAB');
main('dabAcCaCBAcCcaDA');
main();
