/* static given data */
// NOTE: I shortened the number->char mapping using an array instead of {0: ["e", "E"],1: ["J", "N", "Q", "j", "n", "q"],...}
const MAPPING_NUM2CHAR = ['E','JNQ','RWX','DSY','FT','AM','CIV','BKU','LOP','GHZ'];
// TODO: read dictionary from file
const DICTIONARY = `
an
blau
Bo"
Boot
bo"s
da
Fee
fern
Fest
fort
je
jemand
mir
Mix
Mixer
Name
neu
o"d
Ort
so
Tor
Torf
Wasser
`.trim().split('\n');

/* transform inputs into lookup maps  */
// {E:0,J:1,N:1,Q:1,R:2,W:2,X:2,...}
const MAPPING_CHAR2NUM = Object.fromEntries(MAPPING_NUM2CHAR.flatMap((chars, num) => [...chars].map(chr => [chr,num])));
// {482: ['Tor'], 4824: ['fort', 'Torf'], ...}
const MAPPING_NUM2WORDS = DICTIONARY.reduce((acc, word) => {
    const number = [...word].map(chr => MAPPING_CHAR2NUM[chr.toUpperCase()]).join('');
    (acc[number] ??= []).push(word);
    return acc;
}, {});
// simple right-expand search
function getWords(number){
    const results = [];
    for (let i=1; i<=number.length; i++){
        const partNum = number.slice(0,i);
        const words = MAPPING_NUM2WORDS[partNum];
        words && results.push([partNum, words])
    }
    return results;
}
function collectWords(phoneNumber){
    const plainNumber = phoneNumber.replace(/\D/g, '');
    return (function exploreNumber(num, wordsChain){
        if (!num) return `${phoneNumber}: ${wordsChain.join(' ')}`;
        const matchingNodes = getWords(num);

        // No Matching Node found? We may be allowed to add a single Digit...
        const fallbackNodeRequired = matchingNodes.length === 0;
        if (fallbackNodeRequired) {
            // Skip If there would be two digits in a row
            if (isFinite(wordsChain.at(-1))) return;
            matchingNodes.push([num[0], [num[0]]]);
        }

        return matchingNodes.flatMap(([number, words]) => {
            const numberRest = num.slice(number.length);
            // if (!numberRest) return `${number}: ${words.join(' ')}`;
            return words.flatMap((word) => exploreNumber(numberRest,[...wordsChain, word]))
        });

    })(plainNumber, []);
}


(function Main(){

    // TODO: read stream of phonenumbers
    const phonenumberStream = `
112
5624-82
4824
0721/608-4067
10/783--5
1078-913-5
381482
04824`.trim().split('\n');

    // TODO: actual stream may have to be iterated over differntly
    for(let phoneNumber of phonenumberStream) {
        const results = collectWords(phoneNumber);
        // TODO: find a way to not having to filter out empty results
        results.forEach(result => result && console.log(result))
    }
})()


// Given
//  a map M={0:'E',1:'JNQ',2:'RWX',3:'DSY',4:'FT',5:'AM',6:'CIV',7:'BKU',8:'LOP',9:'GHZ'}
//  and a dictionary D=["an","blau","Bo\\"","Boot","bo\\"s","da","Fee","fern","Fest","fort","je","jemand","mir","Mix","Mixer","Name","neu","o\\"d","Ort","so","Tor","Torf","Wasser"]
// I need the words in the dictionary to be mapped to the

///
const mapping = {
    '0': ['E'],
    '1': ['J', 'N', 'Q'],
    '2': ['R', 'W', 'X'],
    '3': ['D', 'S', 'Y'],
    '4': ['F', 'T'],
    '5': ['A', 'M'],
    '6': ['C', 'I', 'V'],
    '7': ['B', 'K', 'U'],
    '8': ['L', 'O', 'P'],
    '9': ['G', 'H', 'Z']
  };

  const dictionary = ['an', 'blau', 'Bo"', 'Boot', 'bo"s', 'da', 'Fee', 'fern', 'Fest', 'fort', 'je', 'jemand', 'mir', 'Mix', 'Mixer', 'Name', 'neu', 'o"d', 'Ort', 'so', 'Tor', 'Torf', 'Wasser'];

  function findWords(digits, memo = {}) {
    if (digits in memo) {
      return memo[digits];
    }

    const words = [];

    for (let i = 1; i <= digits.length; i++) {
      const prefix = digits.substring(0, i);
      const suffix = digits.substring(i);

      if (prefix in mapping) {
        const mappings = mapping[prefix];

        for (const mapping of mappings) {
          if (suffix.length === 0) {
            if (dictionary.includes(mapping)) {
              words.push(mapping);
            }
          } else {
            const suffixWords = findWords(suffix, memo);

            for (const suffixWord of suffixWords) {
              const word = `${mapping} ${suffixWord}`;

              if (dictionary.includes(word)) {
                words.push(word);
              }
            }
          }
        }
      }
    }

    memo[digits] = words;
    return words;
  }
 // old:
//   function findWords(phoneNumber, index = 0, encoding = '') {
//     if (index >= phoneNumber.length) {
//       return encoding ? [encoding] : [''];
//     }
//     const digit = phoneNumber.charAt(index);
//     const letters = mapping[digit];
//     if (!letters) {
//       return findWords(phoneNumber, index + 1, encoding + digit);
//     }
//     let words = [];
//     for (let letter of letters) {
//       words.push(...findWords(phoneNumber, index + 1, encoding + letter));
//     }
//     return words;
//   }

  // Example usage:
  const phoneNumber = '5624-82';
  const encodings = findWords(phoneNumber.replace(/[^0-9]/g, ''));
  for (let encoding of encodings) {
    const words = encoding.split(' ').filter(word => dictionary.includes(word));
    if (words.length > 0) {
      console.log(`${phoneNumber}: ${words.join(' ')}`);
    }
  }


  const reverseMapping = {};
  for (let digit in mapping) {
    for (let letter of mapping[digit]) {
      reverseMapping[letter] = digit;
    }
  }

  const dictionaryDigits = {};
  for (let word of dictionary) {
    const digits = [];
    for (let letter of word) {
      digits.push(reverseMapping[letter]);
    }
    dictionaryDigits[word] = digits.join('');
  }

  console.log(dictionaryDigits);

