import os
from math import copysign, atan, sqrt, pi
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\10\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read().split('\n')
map={}
for y in range(len(puzzle_input)):
    for x in range(len(puzzle_input[y])):
        map[x,y]=puzzle_input[y][x]

x=11
y=13
dists=[]
for a,b in map:
    if map[a,b]=='#' and (a!=x or b!=y):
        if a==x:
            if b<y:
                dists.append((a,b,0,sqrt((a-x)*(a-x)+(b-y)*(b-y))))
            if b>y:
                dists.append((a, b, pi,sqrt((a-x)*(a-x)+(b-y)*(b-y))))
        else:
            if a < x:
                dists.append((a,b, atan((b-y)/(a-x))+3/2*pi,sqrt((a-x)*(a-x)+(b-y)*(b-y))))
            if a>x:
                dists.append((a, b, atan((b - y) / (a - x))+pi/2,sqrt((a-x)*(a-x)+(b-y)*(b-y)) ))

w=0

def vaporize(w):
    maybe=[d for d in dists if d[2]==w]
    mindist=min([d[3] for d in maybe])
    vapor = [d for d in dists if d[2]==w and d[3]==mindist][0]
    print('vaporized: ', vapor)
    arcs = [d[2] for d in dists if d[2]>w]
    return min(arcs) if len(arcs)>0 else min([d[2] for d in dists])

for i in range(200):
    print(i+1)
    w=vaporize(w)