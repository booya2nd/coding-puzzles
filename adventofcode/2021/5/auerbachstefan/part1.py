import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2021\\5\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

lines = [i.split(" -> ") for i in input]
lines = [{"o":line[0].split(","), "d":line[1].split(",")} for line in lines]

lines = [line for line in lines if line["o"][0]==line["d"][0] or line["o"][1]==line["d"][1]]

map = {}

for line in lines:
    x0,x1 = sorted([int(line['o'][0]),int(line['d'][0])], key=lambda x:x)
    for x in range(x0, x1+1):
        y0,y1=sorted([int(line['o'][1]),int(line['d'][1])], key=lambda y:y)
        for y in range(y0, y1+1):
            if (x,y) in map:
                map[(x,y)]=map[(x,y)]+1
            else:
                map[(x,y)]=1

print(len([m for m in map if map[m]>1]))