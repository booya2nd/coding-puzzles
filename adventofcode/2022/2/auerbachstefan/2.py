import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\2\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

pts = {"X":0, "Y":3, "Z":6}
pts2 = {"r":1, "p":2, "s":3}


def get_pts(r):
    p1, p2 = r.split(" ")
    if p1 == 'A' and p2 == 'X':
        o = "s"
    elif p1 == 'B' and p2 == 'Y':
        o = "p"
    elif p1 == 'C' and p2 == 'Z':
        o = "r"
    elif p1 == 'A' and p2 == 'Y':
        o = "r"
    elif p1 == 'B' and p2 == 'Z':
        o = "s"
    elif p1 == 'C' and p2 == 'X':
        o = "p"
    elif p1 == 'A' and p2 == 'Z':
        o = "p"
    elif p1 == 'B' and p2 == 'X':
        o = "r"
    elif p1 == 'C' and p2 == 'Y':
        o = "s"
    return pts[p2]+pts2[o]

res = sum([get_pts(r) for r in input])
print(res)