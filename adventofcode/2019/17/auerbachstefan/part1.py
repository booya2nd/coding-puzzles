import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2019\\17\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()

prog = puzzle_input.split(',')
prog = {i:int(prog[i]) for i in range(len(prog))}

def prog_get(i):
    if i not in prog:
        prog[i]=0
    return prog[i]

def run_intcode(input=None):
    global pos
    global rel
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
            prog[c1] = input
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

pos=0
rel=0
grid = {}



x=0
y=0


import time
import random


print('running intcode..')
while True:
    res = run_intcode()
    if res == None: break
    if chr(res) == '\n':
        y+=1
        x=0
    else:
        grid[(x,y)] = chr(res)
        x+=1


scaffolds = [g for g in grid if
             grid[(g[0], g[1])]!='.' and
(g[0]+1, g[1]) in grid and (g[0]-1, g[1]) in grid and
(g[0], g[1]+1) in grid and (g[0], g[1]-1) in grid and
             grid[(g[0]+1, g[1])]!='.' and
             grid[(g[0]-1, g[1])] != '.' and
             grid[(g[0], g[1]+1)] != '.' and
             grid[(g[0], g[1]+1)] != '.' ]


alignment = sum([g[0]*g[1] for g in scaffolds])


####pygame stuff
import pygame
pygame.init()
white = (255,255,255)
black = (0,0,0)
red = (255,0,0)
green = (0,255,0)
blue = (0,0,255)
gameDisplay = pygame.display.set_mode((800,600))
gameDisplay.fill(black)



def print_grid():
    maxx = max([g[0] for g in grid])
    minx = min([g[0] for g in grid])
    maxy = max([g[1] for g in grid])
    miny = min([g[1] for g in grid])
    time.sleep(0.01)
    gameDisplay.fill(black)

    for j in range(miny,maxy+1):
        for i in range(minx, maxx+1):
            if (i,j) in grid:
                if grid[(i,j)]=='#':
                    pygame.draw.rect(gameDisplay, white, (i*10+10,j*10+10,10,10))
                elif grid[(i,j)]=='.':
                    pygame.draw.circle(gameDisplay, white, (i*10+5+10, j*10+5+10), 1, 1)
                else:
                    pygame.draw.circle(gameDisplay, red, (i*10+5+10, j*10+5+10), 3, 1)
    pygame.display.update()

while True:
    print_grid()

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            quit()