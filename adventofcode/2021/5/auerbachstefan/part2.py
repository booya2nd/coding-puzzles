import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2021\\5\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

lines = [i.split(" -> ") for i in input]
lines = [{"o":line[0].split(","), "d":line[1].split(",")} for line in lines]

map = {}

for line in lines:
    v0, v1 = int(line['d'][0]) - int(line['o'][0]), int(line['d'][1]) - int(line['o'][1])
    vnorm0, vnorm1 = (v0/abs(v0) if v0!=0 else 0), (v1/abs(v1) if v1 != 0 else 0)
    for c in range(max(abs(v0), abs(v1))+1):
        x,y = int(line['o'][0]) + c*vnorm0 , int(line['o'][1]) + c*vnorm1
        if (x,y) in map:
            map[(x,y)]=map[(x,y)]+1
        else:
            map[(x,y)]=1

print(len([m for m in map if map[m]>1]))