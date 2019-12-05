import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\05\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()
input=5

#puzzle_input='3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99'

prog = puzzle_input.split(',')
prog = [int(p) for p in prog]

pos=0

while prog[pos]!=99:
    instr = str(prog[pos])
    opcode = int(instr[-2:])
    #print('pos ', pos, 'instr ' ,instr, 'opcode', opcode )
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
        prog[c1] = input
        pos=pos+2
    if opcode == 4:
        print(prog[c1])
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
