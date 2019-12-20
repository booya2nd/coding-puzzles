import os
from math import ceil
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2019\\19\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()

def prog_reset():
    global prog
    global pos
    global rel
    pos = 0
    rel = 0
    prog = puzzle_input.split(',')
    prog = {i:int(prog[i]) for i in range(len(prog))}

def prog_get(i):
    if i not in prog:
        prog[i]=0
    return prog[i]

def run_intcode():
    global pos
    global rel
    global input
    while True:
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
            prog[c3] = prog_get(c1)*prog_get(c2)
            pos = pos + 4
        if opcode == 3:
            if not input: print('no input..')
            i = input[0]
            input=input[1:]
            prog[c1] = i
            pos=pos+2
        if opcode == 4:
            pos = pos + 2
            return prog_get(c1)
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
        if opcode == 99:
            print('halted')
            return None


output=[]
input=[]
x0=0
x1=10000
y0=0
y1=9000
x=5000
y=4500
lastX=0
lastY=0


while True:
    x0 = 0
    y0 =0
    if lastX==x and lastY==y:
        print(x,y)
        break
    lastX=x
    lastY=y
    print('next round...')
    output1 = -1
    output2 = -1
    output3 = -1
    while x1-x0>1:
        x = ceil((x0 + x1) / 2)

        prog_reset()
        input = [x,y]
        output1  = run_intcode()

        prog_reset()
        input = [x+99,y]
        output2  = run_intcode()

        prog_reset()
        input = [x,y+99]
        output3  = run_intcode()

        if output1==1 and output2==1 and output3==1:
            x1=x
        else:
            x0=x
    x=x1

    output1 = -1
    output2 = -1
    output3 = -1
    while y1-y0>1:
        y = ceil((y0 + y1) / 2)

        prog_reset()
        input = [x, y]
        output1 = run_intcode()

        prog_reset()
        input = [x + 99, y]
        output2 = run_intcode()

        prog_reset()
        input = [x, y + 99]
        output3 = run_intcode()

        if output1 == 1 and output2 == 1 and output3 == 1:
            y1 = y
        else:
            y0 = y
    y=y1

    prog_reset()
    input = [x, y]
    output1 = run_intcode()

    prog_reset()
    input = [x + 99, y]
    output2 = run_intcode()

    prog_reset()
    input = [x, y + 99]
    output3 = run_intcode()

    if output1==1 and output2==1 and output3==1:
        print('try:')
        print(x0,x1,y0,y1)
        print(x, y, output1)
        print(x + 99, y, output2)
        print(x, y + 99, output3)
    else:
        print(x,y)
        break

while True:
    x=x-1
    y=y-1
    prog_reset()
    input = [x, y]
    output1 = run_intcode()

    prog_reset()
    input = [x + 99, y]
    output2 = run_intcode()

    prog_reset()
    input = [x, y + 99]
    output3 = run_intcode()

    if not(output1 == 1 and output2 == 1 and output3 == 1):
        print('finished')
        break
    else:
        print(x,y)