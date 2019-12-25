import os

os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2019\\21\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()

prog = puzzle_input.split(',')
prog = {i: int(prog[i]) for i in range(len(prog))}


def prog_get(i):
    if i not in prog:
        prog[i] = 0
    return prog[i]


def run_intcode(input=None):
    global pos
    global rel
    global new_input
    while True:
        instr = str(prog[pos])
        opcode = int(instr[-2:])
        mode1 = instr[-3:-2] if instr[-3:-2] else '0'
        mode2 = instr[-4:-3] if instr[-4:-3] else '0'
        mode3 = instr[-5:-4] if instr[-5:-4] else '0'

        c1 = prog_get(pos + 1) if mode1 == '0' else pos + 1
        c2 = prog_get(pos + 2) if mode2 == '0' else pos + 2
        c3 = prog_get(pos + 3) if mode3 == '0' else pos + 3

        if mode1 == '2': c1 = prog_get(pos + 1) + rel
        if mode2 == '2': c2 = prog_get(pos + 2) + rel
        if mode3 == '2': c3 = prog_get(pos + 3) + rel

        if opcode == 1:
            prog[c3] = prog_get(c1) + prog_get(c2)
            pos = pos + 4
        if opcode == 2:
            prog[c3] = prog_get(c1) * prog_get(c2)
            pos = pos + 4
        if opcode == 3:
            input = new_input[0]
            new_input = new_input[1:]
            prog[c1] = input
            pos = pos + 2
        if opcode == 4:
            pos = pos + 2
            return prog_get(c1)
        if opcode == 5:
            if prog[c1] != 0:
                pos = prog[c2]
            else:
                pos = pos + 3
        if opcode == 6:
            if prog_get(c1) == 0:
                pos = prog[c2]
            else:
                pos = pos + 3
        if opcode == 7:
            if prog[c1] < prog[c2]:
                prog[c3] = 1
            else:
                prog[c3] = 0
            pos = pos + 4
        if opcode == 8:
            if prog[c1] == prog[c2]:
                prog[c3] = 1
            else:
                prog[c3] = 0
            pos = pos + 4
        if opcode == 9:
            rel += prog_get(c1)
            pos = pos + 2
        if opcode == 99:
            print('halted')
            return None


pos = 0
rel = 0
grid = {}


comms = ['NOT A J',
'NOT C T',
'AND H T',
'OR T J',
'NOT B T',
'AND A T',
'AND C T',
'OR T J',
'AND D J','RUN']



comms_2 = [','.join([str(ord(s)) for s in comm])+',10' for comm in comms]
new_input = ','.join(comms_2)
new_input = [int(i) for i in new_input.split(',')]



import time
import random

print('running intcode..')
while True:
    res = run_intcode()
    if res == None: break
    if res <= 1114112:
        print(chr(res), end=' ')
    else: print(res)

