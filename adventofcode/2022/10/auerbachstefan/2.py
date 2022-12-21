import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\10\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

x=1
cycles=[]

for i in input:
    if i == "noop":
        cycles.append(x)
    if i[:4] == "addx":
        cycles.append(x)
        cycles.append(x)
        addx = int(i.split(" ")[1])
        x=x+addx

while len(cycles)>0:
    line = cycles[:40]
    cycles = cycles[40:]
    line = ["#" if abs(c-line[c])<=1 else "." for c in range(40)]
    print("".join(line))

