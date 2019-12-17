import os
import math
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2019\\14\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read().split('\n')

reacs = {(int(p.split(' => ')[1].split(' ')[0]),p.split(' => ')[1].split(' ')[1]):[(int(t.split(' ')[0]),t.split(' ')[1])  for t in p.split(' => ')[0].split(', ')] for p in puzzle_input}

def return_qty(ing='ORE', f=1):
    q = 0
    if ing == 'FUEL':
        return f
    else:
        for r in [r for r in reacs if ing in [b[1] for b in reacs[r]]]:
            q2 = [t[0] for t in reacs[r] if ing == t[1]][0]
            q+=math.ceil(return_qty(r[1],f)/r[0]) *q2
    return q
a=1
b=1000000000000
g=1000000000000

while (b-a)/2 > 1:
    x=return_qty(f=(a+b)//2)
    if x<g:
        a= (a+b)//2
    else: b=(a+b)//2

print(return_qty(f=(a+b)/2))
res = (a+b)/2