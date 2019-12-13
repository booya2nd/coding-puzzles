import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\13\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()

prog = puzzle_input.split(',')
prog = {i:int(prog[i]) for i in range(len(prog))}

#play for free
prog[0]=2



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
            print(' i:', input, end='')
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

tile_options = {0:'  ', 1:'xx', 2:'bb', 3:'--', 4:'o'}
#empty wall block paddle ball


def print_grid():
    maxx = max([g[0] for g in grid])
    maxy = max([g[1] for g in grid])
    if maxx<44 or maxy<22:
        return
    time.sleep(0.001)
    gameDisplay.fill(black)

    for j in range(maxy):
        for i in range(maxx+1):
            #print(grid[(i,j)], end='')
            if grid[(i,j)]=='bb':
                pygame.draw.rect(gameDisplay, red, (i*10+1+5,j*10+1+5,8,8))
            if grid[(i,j)]=='xx':
                pygame.draw.rect(gameDisplay, white, (i*10+5,j*10+5,10,10))
            if grid[(i,j)]=='--':
                pygame.draw.lines(gameDisplay, white, False, [(i*10+5,j*10+5), (i*10+10+5,j*10+5)], 1)
            if grid[(i,j)]=='o':
                pygame.draw.circle(gameDisplay, blue, (i*10+5+5, j*10+5+5), 4, 1)
        #print('')
    pygame.display.update()

import time

print('running intcode..')
ball=None
paddle=None
while True:
    if [g for g in grid if grid[g]=='o']:
        ball = [g for g in grid if grid[g]=='o']
    if [g for g in grid if grid[g]=='--']:
        paddle = [g for g in grid if grid[g]=='--']
    i=0
    if ball and paddle:
        print_grid()
        if ball[0][0] < paddle[0][0]:
            i=-1
        elif ball[0][0] > paddle[0][0]:
            i=1
        else:
            i =0
    x = run_intcode(i)
    if x == None: break
    y = run_intcode(i)
    t = run_intcode(i)
    if x==-1 and y == 0:
        print('\nScore:',t)
    else:
        grid[(x,y)]=tile_options[t]

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            quit()



