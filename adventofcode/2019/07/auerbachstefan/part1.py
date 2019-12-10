import itertools
import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\07\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()

#puzzle_input='3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0'
perms = list(itertools.permutations([0,1,2,3,4]))

def calc_output(signals):
    prog = puzzle_input.split(',')
    prog = [int(p) for p in prog]
    pos=0
    while prog[pos]!=99:
        instr = str(prog[pos])
        opcode = int(instr[-2:])
        mode1 = '1' if instr[-3:-2]=='1' else '0'
        mode2 = '1' if instr[-4:-3]=='1' else '0'
        mode3 = '1' if instr[-5:-4]=='1' else '0'
        c1 = prog[pos+1] if mode1=='0' else pos+1
        c2 = prog[pos + 2] if mode2 == '0' else pos + 2
        c3 = prog[pos + 3] if mode3 == '0' else pos + 3
        if opcode==1:
            prog[c3] = prog[c1]+prog[c2]
            pos = pos + 4
        if opcode==2:
            prog[c3] = prog[c1]*prog[c2]
            pos = pos + 4
        if opcode == 3:
            prog[c1] = signals[0]
            signals=signals[1:]
            pos=pos+2
        if opcode == 4:
            pos = pos + 2
            return int(prog[c1])
        if opcode == 5:
            if prog[c1]!=0:
                pos = prog[c2]
            else:
                pos=pos+3
        if opcode == 6:
            if prog[c1]==0:
                pos = prog[c2]
            else:
                pos=pos+3
        if opcode == 7:
            if prog[c1]<prog[c2]:
                prog[c3]=1
            else:
                prog[c3]=0
            pos=pos+4
        if opcode == 8:
            if prog[c1]==prog[c2]:
                prog[c3]=1
            else:
                prog[c3]=0
            pos=pos+4

res=None
for p in perms:
    a=0
    for i in p:
       a = calc_output([i,a])
    if not res or a > res:
        res=a
    print(a)
print('max:', res)