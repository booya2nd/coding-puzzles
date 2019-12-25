import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2019\\24\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()
grid = {}
grid[0] = [[k for k in s] for s in puzzle_input.split('\n')]



def get_grid(level, x,y):
    if not level in grid:
        grid[level]=[['.','.','.','.','.'],['.','.','.','.','.'],['.','.','.','.','.'],['.','.','.','.','.'],['.','.','.','.','.']]
    if x in range(5) and y in range(5):
        return grid[level][x][y]
    else: return '.'

def set_new_grid(level, x,y, what):
    if not level in new_grid:
        new_grid[level]=[['.','.','.','.','.'],['.','.','.','.','.'],['.','.','.','.','.'],['.','.','.','.','.'],['.','.','.','.','.']]
    new_grid[level][x][y]=what

def get_adj_bugs(level,x,y):
    normal=[get_grid(level,x-1,y), get_grid(level,x+1,y), get_grid(level, x,y+1), get_grid(level,x,y-1)].count('#')
    #level -1
    inner = 0
    if y==1 and x==2:
        inner = [get_grid(level-1,0,0), get_grid(level-1,1,0),get_grid(level-1,2,0),get_grid(level-1,3,0),get_grid(level-1,4,0),].count('#')
    if y==3 and x==2:
        inner = [get_grid(level-1,0,4), get_grid(level-1,1,4),get_grid(level-1,2,4),get_grid(level-1,3,4),get_grid(level-1,4,4),].count('#')
    if y==2 and x==1:
        inner = [get_grid(level-1,0,0), get_grid(level-1,0,1),get_grid(level-1,0,2),get_grid(level-1,0,3),get_grid(level-1,0,4),].count('#')
    if y==2 and x==3:
        inner = [get_grid(level-1,4,0), get_grid(level-1,4,1),get_grid(level-1,4,2),get_grid(level-1,4,3),get_grid(level-1,4,4),].count('#')
    #level +1
    outer=0
    if x==0:
        outer=outer+[get_grid(level+1, 1,2)].count('#')
    if x==4:
        outer=outer+[get_grid(level+1, 3,2)].count('#')
    if y==0:
        outer=outer+[get_grid(level+1, 2,1)].count('#')
    if y==4:
        outer=outer+[get_grid(level+1, 2,3)].count('#')
    return normal+inner+outer


for c in range(200):
    if c % 2 == 0:
        minL = min([l for l in grid])
        maxL = max([l for l in grid])
        grid[minL-1] = [['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.'],
                       ['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.']]
        grid[maxL+1] = [['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.'],
                       ['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.']]
    new_grid = {l:[s[:] for s in grid[l][:]] for l in grid}
    for l in new_grid:
        for x in range(5):
            for y in range(5):
                if not (x==2 and y==2):
                    if get_grid(l,x,y) == '#' and get_adj_bugs(l,x, y) != 1:
                        new_grid[l][x][y] = '.'
                    elif get_grid(l,x,y) == '.' and get_adj_bugs(l,x, y) in (1, 2):
                        new_grid[l][x][y] = '#'
    grid={l:[s[:] for s in new_grid[l][:]] for l in new_grid}

res =   sum(
            [sum(
                [l.count('#') for l in grid[k]]
                ) for k in grid]
            )