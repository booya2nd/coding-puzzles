import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\2\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

pts = {"X":1, "Y":2, "Z":3}


def get_pts(r):
    p1, p2 = r.split(" ")
    if p1 == 'A' and p2 == 'X':
        o = 3
    elif p1 == 'B' and p2 == 'Y':
        o = 3
    elif p1 == 'C' and p2 == 'Z':
        o = 3
    elif p1 == 'A' and p2 == 'Y':
        o = 6
    elif p1 == 'B' and p2 == 'Z':
        o = 6
    elif p1 == 'C' and p2 == 'X':
        o = 6
    else:
        o=0
    return pts[p2]+o

res = sum([get_pts(r) for r in input])
print(res)