import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\09\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()
input=1

#puzzle_input='109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'

prog = puzzle_input.split(',')
prog = {i:int(prog[i]) for i in range(len(prog))}

def prog_get(i):
    if i not in prog:
        prog[i]=0
    return prog[i]

pos=0
rel=0

while prog[pos]!=99:
    instr = str(prog[pos])
    opcode = int(instr[-2:])
    mode1 = instr[-3:-2] if instr[-3:-2] else '0'
    mode2 =  instr[-4:-3] if instr[-4:-3] else '0'
    mode3 =  instr[-5:-4] if instr[-5:-4] else '0'

    c1 = prog_get(pos+1) if mode1=='0' else pos+1
    c2 = prog_get(pos + 2) if mode2 == '0' else pos + 2
    c3 = prog_get(pos + 3) if mode3 == '0' else pos + 3

    if mode1 == '2': c1 = prog_get(pos + 1)+rel
    if mode2 == '2': c2 = prog_get(pos + 2) +rel
    if mode3 == '2': c3 = prog_get(pos + 3)+rel

    if opcode==1:
        prog[c3] = prog_get(c1)+prog_get(c2)
        pos = pos + 4
    if opcode==2:
        prog[c3] = prog[c1]*prog[c2]
        pos = pos + 4
    if opcode == 3:
        prog[c1] = input
        pos=pos+2
    if opcode == 4:
        print(prog_get(c1))
        pos = pos + 2
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
    if opcode == 9:
        rel+=prog_get(c1)
        pos = pos + 2
