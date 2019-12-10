import itertools
import os
import time
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\07\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()

#puzzle_input='3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10'
perms = list(itertools.permutations([5,6,7,8,9]))

def calc_output(amp):
    while progs[amp][pos[amp]]!=99:
        instr = str(progs[amp][pos[amp]])
        opcode = int(instr[-2:])
        mode1 = '1' if instr[-3:-2]=='1' else '0'
        mode2 = '1' if instr[-4:-3]=='1' else '0'
        mode3 = '1' if instr[-5:-4]=='1' else '0'
        c1 = progs[amp][pos[amp]+1] if mode1=='0' else pos[amp]+1
        c2 = progs[amp][pos[amp] + 2] if mode2 == '0' else pos[amp] + 2
        if mode3=='0':
            if pos[amp] + 3 >= len(progs[amp]):
                c3=None #hopefully not used but looks good
            else:
                c3 = progs[amp][pos[amp] + 3]
        else:
            c3= pos[amp] + 3
        if opcode==1:
            progs[amp][c3] = progs[amp][c1]+progs[amp][c2]
            pos[amp] = pos[amp] + 4
        if opcode==2:
            progs[amp][c3] = progs[amp][c1]*progs[amp][c2]
            pos[amp] = pos[amp] + 4
        if opcode == 3:
            progs[amp][c1] = amp_signals[amp][0]
            amp_signals[amp]=amp_signals[amp][1:]
            pos[amp]=pos[amp]+2
        if opcode == 4:
            pos[amp] = pos[amp] + 2
            return str(progs[amp][c1])
        if opcode == 5:
            if progs[amp][c1]!=0:
                pos[amp] = progs[amp][c2]
            else:
                pos[amp]=pos[amp]+3
        if opcode == 6:
            if progs[amp][c1]==0:
                pos[amp] = progs[amp][c2]
            else:
                pos[amp]=pos[amp]+3
        if opcode == 7:
            if progs[amp][c1]<progs[amp][c2]:
                progs[amp][c3]=1
            else:
                progs[amp][c3]=0
            pos[amp]=pos[amp]+4
        if opcode == 8:
            if progs[amp][c1]==progs[amp][c2]:
                progs[amp][c3]=1
            else:
                progs[amp][c3]=0
            pos[amp]=pos[amp]+4
    return 'halted'

res=None
for p in perms:
    print('perm', p)
    print('res', res)
    progs = [[int(p) for p in puzzle_input.split(',')] for x in range(5)]
    amp_signals = [[] for x in range(5)]
    pos = [0 for x in range(5)]
    amp_signals[0].append(p[0])
    amp_signals[1].append(p[1])
    amp_signals[2].append(p[2])
    amp_signals[3].append(p[3])
    amp_signals[4].append(p[4])
    a='0'
    while a != 'halted':
        for i in p:
            if a != 'halted':
                amp = p.index(i)
                amp_signals[amp].append(int(a))
                a = calc_output(amp)
                if a != 'halted' and (not res or int(a) > int(res)):
                    res=a
print('max:', res)