import os
import math
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2019\\14\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read().split('\n')

reacs = {(int(p.split(' => ')[1].split(' ')[0]),p.split(' => ')[1].split(' ')[1]):[(int(t.split(' ')[0]),t.split(' ')[1])  for t in p.split(' => ')[0].split(', ')] for p in puzzle_input}

def return_qty(ing, f=1):
    q = 0
    if ing == 'FUEL':
        return f
    else:
        for r in [r for r in reacs if ing in [b[1] for b in reacs[r]]]:
            q2 = [t[0] for t in reacs[r] if ing == t[1]][0]
            q+=math.ceil(return_qty(r[1])/r[0],f) *q2
    return q

res=return_qty('ORE')
