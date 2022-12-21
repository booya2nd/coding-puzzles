import os
import math
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\9\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')


def sign(x):
    if x>0:
        return 1
    elif x<0:
        return -1
    else:
        return 0

#input = ["R 5","U 8","L 8","D 3","R 17","D 10","L 25","U 20"]

pos = {}

knots = [(0,0) for k in range(10)]

pos[knots[9]]=1

def get_dist(h,t):
    if max(abs(h[0]-t[0]),abs(h[1]-t[1]))>1:
        return (sign(h[0]-t[0]),sign(h[1]-t[1]))
    else:
        return(0,0)

for i in input:
    print(i)
    dir = i[0]
    steps = int(i.split(" ")[1])
    for s in range(steps):
        print(knots)
        if dir == 'L':
            knots[0] = (knots[0][0]-1, knots[0][1])

        elif dir == 'R':
            knots[0] = (knots[0][0] + 1,knots[0][1])

        elif dir == 'U':
            knots[0] = (knots[0][0] , knots[0][1]-1)

        elif dir == 'D':
            knots[0] = (knots[0][0] , knots[0][1]+1)

        for k in range(1, 10):
            d = get_dist(knots[k - 1], knots[k])
            knots[k] = (knots[k][0] + d[0], knots[k][1] + d[1])

        pos[knots[9]] = pos[knots[9]] +1 if knots[9] in pos else 1

print(len(pos))