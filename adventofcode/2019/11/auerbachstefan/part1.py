import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\11\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()
input=2



prog = puzzle_input.split(',')
prog = {i:int(prog[i]) for i in range(len(prog))}

def prog_get(i):
    if i not in prog:
        prog[i]=0
    return prog[i]

robot = (0,0)
dir = (0,-1)
pos=0
rel=0
panel = {}

output = None

def get_panel_color(xy):
    if xy in panel:
        return panel[xy]
    else:
        return 0 #black


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
            print('input taken:', input)
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
            return int(instr)


while output != 99:
    col = get_panel_color(robot)
    output = run_intcode(col)
    if output == 99:
        break
    new_dir = run_intcode(col)
    panel[robot] = output
    print('curr color', col)
    print('color to paint:', output)
    print('dir output:', new_dir)
    print('old dir vec', dir)
    if new_dir == 0:
        if dir == (0,-1): dir = (-1,0)
        elif dir == (-1, 0): dir = (0, 1)
        elif dir == (0, 1): dir = (1, 0)
        elif dir == (1, 0): dir = (0, -1)
    else:
        if dir == (0,-1): dir = (1,0)
        elif dir == (-1, 0): dir = (0, -1)
        elif dir == (0, 1): dir = (-1, 0)
        elif dir == (1, 0): dir = (0, 1)
    print('new dir vec', dir)
    robot=(robot[0]+dir[0], robot[1]+dir[1])
    print('new robot pos', robot)
    print('')

res = len(panel)