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
// [['10', ['je']], ['107', ['neu']], ...]
function getWords(number){
    const results = [];
    for (let i=1; i<=number.length; i++){
        const partNum = number.slice(0,i);
        const words = MAPPING_NUM2WORDS[partNum];
        words && results.push([partNum, words])
    }
    if (!results.length) results.push([number[0], [number[0]]]);
    return results;
}
const getWordsMem = memoize(getWords);

const MEMOIZE_DEBUG = {
    CACHE_GET: 0b1,
    CACHE_SET: 0b10
}
let DEBUG = 0 && MEMOIZE_DEBUG.CACHE_GET | MEMOIZE_DEBUG.CACHE_SET;
function memoize(fn, getIdentifier=x=>x){
    const cache = new Map();
    return (...args) => {
        const id = getIdentifier ? getIdentifier(...args) : args[0];
        if (cache.has(id)) {
            return cache.get(id);
        }
        const result = fn(...args);
        cache.set(id, result);
        return result;
    }
}
function collectWords(plainNumber) {
    if (!plainNumber) return [];
    // matches = getWordsMem('10748') = [['10', ['je']], ['107', ['neu']], ...]
    const matches = getWordsMem(plainNumber);
    /*
            const [[, [matchedFirstWord]]] = matches;
            const hasTwoConsecutiveNumbers = isFinite(matchedFirstWord) && isFinite(wordsChain.at(-1));
            if (hasTwoConsecutiveNumbers) return;

     */


    //  [[12, [word1, word2]], [123, [word1, word2]]]
    // [[21345678, word1afhjaf], ]
    const results = [];
    for (let [number, words] of matches) {
        const numberRest = plainNumber.slice(number.length);
        for (let word of words) {
            const subResult = [];
            if (numberRest) {
                const subWords = collectWords(numberRest);
                subResult.push(subWords)
            } else {
                results.push(word, ...subResult);
            }
        }
    }

    return results;

}




(function Main(){
    // TODO: read stream of phonenumbers
    const phoneNumberStream = ['1078-913-5'] || `
112
5624-82
4824
0721/608-4067
10/783--5
1078-913-5
381482
04824`.trim().split('\n');

    // TODO: actual stream may have to be iterated over differntly
    for(let phoneNumber of phoneNumberStream) {
        const plainNumber = phoneNumber.replace(/\D/g, '');
        const results = collectWords(plainNumber);
        console.log(phoneNumber, results);
        // TODO: find a way to not having to filter out empty results
        // results.forEach(result => result && console.log(result))
    }
})()



/***********************************************/
/***********************************************/
/***********************************************/
/***********************************************/
/********  NOTES IDEAS AND TRASH  **************/
/***********************************************/
/***********************************************/
/***********************************************/
/***********************************************/
/***********************************************/

/**
 * Pass on the references!
 * result = #1[]
 * call(..., #1)
 *
 *      {{{{{{ iteration 1 {{{{{{
 *      temp0 [ #2[ #3Node ], #4[ #5Node ] ]
 *      temp #1[ ...temp0 ]
 *      call(..., #2)
 *
 *           {{{{{{ iteration 2 {{{{{{
 *           temp0 [ #6[ #7Node ] ]
 *           temp #2[ ...temp0 ]
 *           call(..., #6)
 *
 *               {{{{{{ iteration 3 {{{{{{
 *               temp0 []
 *               temp #6[ ...temp0 ]
 *               // no call!
 *               }}}}}}
 *
 *           }}}}}}
 *
 *      }}}}}}
 *
 * return result
 */

function collect(number){
    const self = this;
    const graph = [];

    // TODO: remove paths, that will not exhaust the number!
    const words = (function exploreNumber(num, branch, meta){
        if (!num) return meta;
        const matchingNodes = self.get(num);

        // No Matching Node found? We may be allowed to add a single Digit...
        const fallbackNodeRequired = matchingNodes.length === 0;
        if (fallbackNodeRequired) {
            // Skip If there would be two digits in a row
            if (isFinite(meta.words.at(-1))) return;
            matchingNodes.push(NumberNode(num[0], [num[0]]));
        }

        // add result branches to our graph
        const nodeBranches = matchingNodes.map(matchingNode => [matchingNode]); // a branch can be represented by a simple array
        branch.push(...nodeBranches); // mind to keep the exact array-references!

        return nodeBranches.flatMap(nodeBranch => {
            const [matchingNode] = nodeBranch;
            return matchingNode.words.flatMap((word) => {
                const numberRest = num.replace(matchingNode.number, '');
                return exploreNumber(
                    numberRest,
                    nodeBranch,
                    { num: meta.num + matchingNode.number, words: [...meta.words, word]}
                );
            })
        });

    })(number, graph, { num: '', words: [] });

    return {graph, words};
}

// downside wastes exploration time on numbers that will not have a word
function expandRight(phoneNumber){
    console.log('encode number:', phoneNumber)

    /*
    const endResult = [];
    function search(number, results = []){
        for(let i=1, l=number.length; i<l; i++) {
            const part = number.slice(0,i);
            const matches = MAPPING_NUM2WORDS[part];
            if (matches) {
                results.push(matches);
                search(number.slice(i), matches)
            }
        }
        endResult.push(results)
    }

    search(phoneNumber);

    return endResult;
    */
    function xsearch(num, results = []){

        let part = '', digit, rest = num;
        while(rest.length) {
            [digit, ...rest] = rest;
            part += digit;
            const matches = MAPPING_NUM2WORDS[part] || [];
            if (matches.length) {
                results.push(matches)
                xsearch(rest.join(''), matches)
            }
        }

        return results
    }

    // search(122345)
    // part=122, rest=345;
    // matches=[foo,FOO]
    //  -> _cache[122]=[foo,FOO]
    //
    //      search(345)
    //      part=345, rest=;
    //      matches=[bar, BAR]
    //       -> _cache[345]=[bar, BAR]
    //
    // [foo, FOO, [bar, BAR] ]
    //  foo + bar, foo + BAR, FOO + bar, FOO + BAR


    // search (123123123123)

    const _searchCache = {};
    function search(num, results = []){
        if (_searchCache[num]) return _searchCache[num];

        let part = '', digit, rest = num;
        while(rest.length) {
            [digit, ...rest] = rest;
            part += digit;
            const matches = MAPPING_NUM2WORDS[part] || [];
            _searchCache[part] = matches;
            if (matches.length) {

                results.push(matches);
                search(rest.join(''), matches);
            }
        }

        return results
    }


    const results = search(phoneNumber);

    return results;

}














