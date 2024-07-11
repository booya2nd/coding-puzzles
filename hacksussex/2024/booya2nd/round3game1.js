/*
"Given a pattern and a string s, find if s follows the same pattern.
Here follow means a full match, such that there is a bijection (one-to-one correspondance) between a letter in pattern and a non-empty word in s."

"Example 1:
Input: pattern = 'abba"'
, S =
"'dog cat cat dog'
Output: true
 */
function solution(pattern, s) {
    const words = s.split(' ');
    const letters = pattern.split('');
    const map = {};
    for (let i = 0; i < letters.length; i++) {
        map[letters[i]] ||= words[i];
        if (map[letters[i]] !== words[i]) return false;
    }
    return true;
}
// input doesnt match task
const r = solution(
    'cabcba', 'bird dog cat bird cat dog'
);
console.log( r);