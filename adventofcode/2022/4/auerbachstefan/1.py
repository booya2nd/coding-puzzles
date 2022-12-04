import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\4\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

def list_contains(a,b):
    if (int(a[0]) >= int(b[0]) and int(a[1])<=int(b[1])) or (int(a[0]) <= int(b[0]) and int(a[1])>=int(b[1])):
        print(a,b)
        return 1
    else:
        return 0

sections = [i.split(",") for i in input]
pairs = [[p.split("-") for p in s] for s in sections]

overlaps = [list_contains(p[0],p[1]) for p in pairs]

print(sum(overlaps))