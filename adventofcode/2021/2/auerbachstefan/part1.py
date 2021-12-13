import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2021\\2\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

h,d = 0,0
for k,v in enumerate(input):
    cmd, l = v.split(" ")
    l=int(l)
    if cmd == 'forward':
        h=h+l
    if cmd == 'down':
        d = d+l
    if cmd == 'up':
        d = d- l

print(h*d)