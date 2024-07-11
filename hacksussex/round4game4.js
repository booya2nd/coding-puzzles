/*
You are given an integer array matches where matches[il = [winneri, loseril indicates that the player winneri
defeated player loser in a match.
Return a list answer of size 2 where:
answer[0] is a list of all players that have not lost any matches. answer[1] is a list of all players that have lost exactly one match.
The values in the two lists should be returned in increasing order.

Example 1:
Input: matches = [[1,3],[2,3],[3,6],[5,6],[5,7],[4,5],[4,8],[4,9],[10,4],[10,9]]
Output: [[1,2,10],[4,5,7,8]]
Explanation:
Players 1, 2, and 10 have not lost any matches.
layers
Players 4, 5, 7, and 8 each have lost one match.
Players 3, 6, and 9 each have lost two matches.
Thus, answer [0] = [1,2,10] and answer[1] = [4,5,7,8].
 */
function solution(matches) {
    const losses = [];
    matches.forEach(([winner, loser]) => {
        losses[winner] ??= 0;
        losses[loser] ??= 0;
        losses[loser]++;
    });

    const results = []
    losses.forEach((count, player) => {
        (results[count]??=[]).push(player);
    });

    return results.slice(0,2);
}
// input doesnt match task
const r = solution(
    [[1,3],[2,3],[3,6],[5,6],[5,7],[4,5],[4,8],[4,9],[10,4],[10,9]] // [[1,2,10],[4,5,7,8]]
);
console.log( r);
