import os
from math import copysign
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\10\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read().split('\n')
map={}
for y in range(len(puzzle_input)):
    for x in range(len(puzzle_input[y])):
        map[x,y]=puzzle_input[y][x]

max=0
for x,y in map:
    if map[x,y]=='#':
        dists=[]
        for a,b in map:
            if map[a,b]=='#' and (a!=x or b!=y):
                if b==y:
                    dists.append(
                        (
                            copysign(1, a - x),
                            copysign(1, b - y),
                            'inf'
                        )
                    )
                else:
                    dists.append(
                        (
                            copysign(1,a-x),
                            copysign(1,b-y),
                            (a-x)/(b-y)
                        )
                    )
        if len(set(dists))>max:
            max=len(set(dists))
            print(x,y,len(set(dists)))