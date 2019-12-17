import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2019\\15\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()

prog = puzzle_input.split(',')
prog = {i:int(prog[i]) for i in range(len(prog))}


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

##################### end of pygame

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

tile_options = {0:'wall', 1:'explored', 2:'oxygen'}
#empty wall block paddle ball


x=0
y=0


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
                if grid[(i,j)]=='wall':
                    pygame.draw.rect(gameDisplay, white, (i*10+400,j*10+300,10,10))
                if grid[(i,j)]=='oxygen':
                    pygame.draw.circle(gameDisplay, blue, (i*10+5+400, j*10+5+300), 4, 1)
                if grid[(i,j)]=='explored':
                    pygame.draw.circle(gameDisplay, white, (i*10+5+400, j*10+5+300), 1, 1)
    pygame.draw.rect(gameDisplay, red, (x * 10 + 400 +2, y * 10 + 300 +2, 6, 6))
    pygame.display.update()

import time
import random

walks = []
steps = 0

def get_dir():
    global walks
    global steps
    nowalls=[]
    if (x,y-1) not in grid: nowalls.append(1)
    if (x,y+1) not in grid: nowalls.append(2)
    if (x-1,y) not in grid: nowalls.append(3)
    if (x+1,y) not in grid: nowalls.append(4)
    if nowalls:
        d = random.choice(nowalls)
        walks.append(d)
        steps +=1
        return d
    elif walks:
        d = walks[-1]
        walks = walks[:-1]
        if d ==1: d=2
        elif d==2: d=1
        elif d==3:d=4
        elif d==4:d=3
        steps -=1
        return d
    else:
        return(None)


print('running intcode..')
while True:
    i = get_dir()
    if i==None: break
    x_old=x
    y_old=y
    if i==1:
        y=y-1
    elif i==2:
        y=y+1
    elif i==3:
        x=x-1
    elif i==4:
        x=x+1
    else: print('error')
    res = run_intcode(i)
    if res == None: break
    grid[(x,y)]=tile_options[res]
    if res == 2:
        print(steps)
    if res == 0:
        walks = walks[:-1]
        x=x_old
        y=y_old
        steps -=1
    else:
    print_grid()

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            quit()



