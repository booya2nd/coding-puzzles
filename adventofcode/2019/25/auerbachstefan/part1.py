import os

os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2019\\25\\auerbachstefan')
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
            if len(new_input)==0:
                pb = ['drop fixed point', 'drop candy cane', 'drop sand', 'drop fuel cell', 'drop wreath', 'drop ornament', 'space law space brochure']
                pb2 = pb[:]
                for w in range(7):
                    if random.randint(0,1)==0:
                        pb2.remove(pb[w])
                print('trying', pb2)
                comms = pb2 + ['west']+ ['take fixed point', 'take candy cane', 'take sand', 'take fuel cell',  'take wreath', 'take ornament', 'space law space brochure']
                comms_2 = [','.join([str(ord(s)) for s in comm]) + ',10' for comm in comms]
                new_input = ','.join(comms_2)
                new_input = [int(i) for i in new_input.split(',')]
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




comms = [
    'east', 'take sand',#gift center
    'east',  #kitchen (dont take molten lava)
    'west', 'west', #hull breach
    'south', 'take ornament',#quarters
    'east', #observatory
    'west', 'north', 'west', #sickbay
    'north', 'take wreath',#hallway
    'east', 'take fixed point',#engineering
    'west', 'north', #corridor (dont take inf loop)
    'north', 'take spool of cat6',#passage
    'south','south','south','south', # dont take giant electromagnet,#arcade
    'south', 'take candy cane',#holo peek
    'north', 'east', #dont take escape pod',#warp drive
    'south', #stables
    'north','east', #navigation
    'south', #dont take photons',#chocolate fountain
    'north',    'east', 'take space law space brochure',#storage
    'south', 'take fuel cell',#science lab
    'south', 'inv',#security checkpoint
'drop spool of cat6', #(wayy too heavy)

 'drop candy cane', 'drop fuel cell', 'drop ornament', #got this by brute force

    'west'] #pressure floor


comms_2 = [','.join([str(ord(s)) for s in comm])+',10' for comm in comms]
new_input = ','.join(comms_2)
new_input = [int(i) for i in new_input.split(',')]



import time
import random

output=''

print('running intcode..')
while True:
    res = run_intcode()
    if res == None: break
    if res <= 1114112:
        output=output+chr(res)
        print(chr(res), end='')
    #else: print(res)

locations  = [l for l in output.split('== ') if '==' in l]

loc_final = [{'Location':l.split(' ==')[0],
              'Description':l.split(' ==')[1].split('Doors')[0].replace('\n',''),
                'Doors':l.split(' ==')[1].split('Doors here lead:')[1].split('\n\n')[0],
                'Items':l.split(' ==')[1].split('Items here:')[1].split('\n\n')[0] if 'Items' in l else ''
              } for l in locations]

locas = set([l['Location'] for l in loc_final])

for l in loc_final:
    print(l)