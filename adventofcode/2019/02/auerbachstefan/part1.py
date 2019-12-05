import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\02\\auerbachstefan')
input = open('input.txt', 'r').read()

#input= '2,4,4,5,99,0'

prog = input.split(',')
prog = [int(p) for p in prog]

prog[1]=12
prog[2]=2

pos=0

while prog[pos]!=99:
    print(pos)
    if prog[pos]==1:
        prog[prog[pos+3]] = prog[prog[pos+1]]+prog[prog[pos+2]]
    if prog[pos]==2:
        prog[prog[pos+3]] = prog[prog[pos+1]]*prog[prog[pos+2]]
    pos=pos+4

res = prog[0]