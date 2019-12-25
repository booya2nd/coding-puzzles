import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2019\\24\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()
grid = [[k for k in s] for s in puzzle_input.split('\n')]

def get_grid(x,y):
    if x in range(5) and y in range(5):
        return grid[x][y]
    else: return '.'

def get_adj_bugs(x,y):
    return [get_grid(x-1,y), get_grid(x+1,y), get_grid(x,y+1), get_grid(x,y-1)].count('#')

seen_list=[]

while True:
    seen_list.append(grid)
    grid_new=[l[:] for l in grid]
    for x in range(5):
        for y in range(5):
            if grid[x][y]=='#' and get_adj_bugs(x,y)!=1:
                grid_new[x][y]='.'
            elif grid[x][y]=='.' and get_adj_bugs(x,y) in (1,2):
                grid_new[x][y]='#'
    grid=grid_new[:]
    if grid in seen_list:
        print(grid)
        break

s=0
for x in range(5):
    for y in range(5):
        if get_grid(x,y)=='#':
            s=s+pow(2,x*5+y)

print(s)
