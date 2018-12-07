const fs = require('fs');
const path = require('path');

const process = (input) => {
  let processed = '';
  let changed = false;

  for (let i = 0; i < input.length - 1; i++) {
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

  return { changed, processed };
}

const main = () => {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

  let changed = false;
  let processed = input;
  do {
    const result = process(processed);
    
    changed = result.changed;
    processed = result.processed;

  } while (changed);

  console.log(processed);
}

main();