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
        addx = int(i.split(" ")[1])
        x=x+addx
        cycles.append(x)

signal_strength=0

for c in [20,60,100,140,180,220]:
    signal_strength=signal_strength+c*cycles[c-2]

print(signal_strength)
