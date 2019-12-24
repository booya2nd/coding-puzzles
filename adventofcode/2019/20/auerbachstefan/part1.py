import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2019\\20\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()

#input vars
p = [s for s in puzzle_input]
grid={}
y = 0
x = 0

#transform input to grid
while True:
    if not p: break
    i = p.pop(0)
    if i == '\n':
        y+=1
        x=0
    else:
        grid[(x,y)]=i
        x+=1

#correct node names
corr_grid = [g for g in grid if grid[g]>='A' and grid[g]<='Z']
for x,y in corr_grid:
    if grid[(x,y)]>='A' and grid[(x,y)]<='Z':
        if (x+1,y) in grid and grid[(x+1,y)]=='.' :
            key=grid[(x-1,y)]+grid[(x,y)]
            if (x-2,y) not in grid: key=key+'o'
            else: key=key+'u'
            grid[(x+1,y)]=key
            grid[(x-1,y)]=' '
            grid[(x, y)] = ' '
        if  (x-1,y) in grid and grid[(x-1,y)]=='.' :
            key=grid[(x,y)]+grid[(x+1,y)]
            if (x+2,y) not in grid: key=key+'o'
            else: key=key+'u'
            grid[(x-1,y)]=key
            grid[(x+1,y)]=' '
            grid[(x, y)] = ' '
        if (x,y-1) in grid and grid[(x,y-1)]=='.' :
            key=grid[(x,y)]+grid[(x,y+1)]
            if (x,y+2) not in grid: key=key+'o'
            else: key=key+'u'
            grid[(x,y-1)]=key
            grid[(x,y+1)]=' '
            grid[(x, y)] = ' '
        if  (x,y+1) in grid and grid[(x,y+1)]=='.':
            key=grid[(x,y-1)]+grid[(x,y)]
            if (x,y-2) not in grid: key=key+'o'
            else: key=key+'u'
            grid[(x,y+1)]=key
            grid[(x,y-1)]=' '
            grid[(x, y)] = ' '

edges={}

#add edge to graph
def add_edge(s1,s2,steps, _edges):
    l = [s1,s2]
    l.sort()
    e='-'.join(l)
    if e in _edges:
        if steps < _edges[e]: _edges[e]=steps
    else: _edges[e]=steps
    return _edges

#traverse maze in all directions to build graph
def explore(curr, p, v, steps):
    global edges
    #print('exploring', 'current symbol', curr, 'current point',  p, 'visited', v, 'steps', steps)
    steps=steps+1

    v1=v[:]
    p2 = (p[0] + 1, p[1])
    if p2 not in v1:
        v1.append(p2)
        if p2 in grid and grid[p2] not in '#. ':
            edges=add_edge(curr,grid[p2],steps, edges)
        elif p2 in grid and grid[p2] == '.':
            explore(curr, p2, v1, steps)

    v2 = v[:]
    p2 = (p[0], p[1]+1)
    if p2 not in v2:
        v2.append(p2)
        if p2 in grid and  grid[p2] not in '#. ':
            edges=add_edge(curr,grid[p2],steps, edges)
        elif p2 in grid and grid[p2] == '.':
            explore(curr, p2, v2, steps)

    v3 = v[:]
    p2 = (p[0], p[1] - 1)
    if p2 not in v3:
        v3.append(p2)
        if p2 in grid and grid[p2] not in '#. ':
            edges=add_edge(curr,grid[p2],steps, edges)
        elif p2 in grid and grid[p2] == '.':
            explore(curr, p2, v3, steps)

    v4 = v[:]
    p2 = (p[0]-1, p[1] )
    if p2 not in v4:
        v4.append(p2)
        if p2 in grid and grid[p2] not in '#. ':
            edges=add_edge(curr,grid[p2],steps, edges)
        elif p2 in grid and grid[p2] == '.':
            explore(curr, p2, v4, steps)

for g in [g for g in grid if grid[g] not in '.# ']:
    explore(grid[g], g, [g], 0)

#add warp edges
for g in [grid[g] for g in grid if grid[g] not in '.# ' and not 'o' in grid[g]]:
    n=g[0:2]
    edges=add_edge(n+'u', n+'o', 1, edges)


def h(n1,n2):
    return 0
    return abs(n1[0]-n2[0])+abs(n1[1]-n2[1])

def reconstruct_path(cameFrom, current):
    total_path=[current]
    while current in cameFrom:
        current=cameFrom[current]
        total_path=[current]+total_path
    print(total_path)
    return total_path

def astar(s,g):
    openSet=[s]
    cameFrom={}

    gScore = {grid[g]:float('inf') for g in grid if grid[g] not in '#. '}
    gScore[s] = 0

    fScore = {grid[g]:float('inf') for g in grid if grid[g] not in '#. '}
    fScore[s] = 0 #h(stuff[s], stuff[g])

    while openSet:
        current = min(openSet, key=lambda n:fScore[n])
        print(current, openSet)
        if current==g:
            print(gScore[g])
            return reconstruct_path(cameFrom, current)

        openSet.remove(current)
        for edge in [e for e in edges if current in e]:
            nb=edge.replace(current,'').replace('-','')
            tentative_gScore = gScore[current]+edges[edge]
            if tentative_gScore < gScore[nb]:
                cameFrom[nb]=\
                    current
                gScore[nb]=tentative_gScore
                fScore[nb]=gScore[nb]+0#h(stuff[nb],stuff[g])
                if nb not in openSet:
                    openSet.append(nb)

res = astar('AAo','ZZo')
print(warps)