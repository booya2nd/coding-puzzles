import os

os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2019\\22\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()

tecs = puzzle_input.split('\n')

deck = list(range(10007))

def rev_deck(_deck):
    return [i for i in reversed(_deck)]

def cut(_deck, n):
    return _deck[n:]+_deck[:n]

def inc(_deck,n):
    d={}
    for i in range(len(_deck)):
        pos = i*n % len(_deck)
        d[pos]=_deck[i]
    return [d[k] for k in range(len(_deck))]

for t in tecs:
    if t == 'deal into new stack':
        deck = rev_deck(deck)
    if 'increment' in t:
        i = int(t.split(' ')[-1])
        deck = inc(deck,i)
    if 'cut' in t:
        i = int(t.split(' ')[-1])
        deck= cut(deck,i)

print(deck.index(2019))