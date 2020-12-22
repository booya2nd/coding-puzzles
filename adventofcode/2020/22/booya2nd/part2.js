const input = require('fs').readFileSync('input.txt', 'utf8').trim().match(/^\d+/gm).map(Number)
const LEN = input.length, L = arr => arr.length;
const players = [input.slice(0,LEN/2), input.slice(LEN/2)];

function _play([p1,p2], cache){
  const quickWin = cache[0]?.[p1] || cache[1]?.[p2];
  [p1,p2].forEach((nums, i) => (cache[i]||={})[nums] = 1);

  const [n1, n2] = [p1.shift(), p2.shift()];
  if (quickWin) return { winner: 0, drawn: [n1,n2] };

  const win = [[n1,n2], [n2,n1]], winner = (n2 > n1)*1;
  const enoughLeft = L(p1) >= n1 && L(p2) >= n2;
  if (!enoughLeft) return { winner, drawn: win[winner] };

  const subWinner = play([p1.slice(0,n1),p2.slice(0,n2)], []);
  return {
    winner: subWinner,
    drawn: win[subWinner]
  }
}

function play(players, cache = []){
  while(players.every(L)) {
    const { winner, drawn } = _play(players, cache);
    players[winner]?.push(...drawn);
  }
  return players.findIndex(L);
}

console.info(players[play(players)].reverse().reduce((acc, n, i) => acc+n*(i+1),0))
