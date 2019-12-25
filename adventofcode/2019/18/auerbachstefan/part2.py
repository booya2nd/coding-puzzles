import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2019\\18\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()

#input vars
p = [s for s in puzzle_input]
grid={}
stuff={}
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
        if i not in '#.': stuff[i]=(x,y)
        x+=1

edges={}

#part2 specifics!
stuff.pop('@')
stuff['1']=(39,39)
stuff['2']=(41,39)
stuff['3']=(39,41)
stuff['4']=(41,41)
grid[(39,39)]='1'
grid[(40,39)]='#'
grid[(41,39)]='2'
grid[(39,40)]='#'
grid[(40,40)]='#'
grid[(41,40)]='#'
grid[(39,41)]='3'
grid[(40,41)]='#'
grid[(41,41)]='4'




#add edge to graph
def add_edge(s1,s2,steps, _edges):
    l = [s1,s2]
    l.sort()
    e=''.join(l)
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
        if grid[p2] not in '#.':
            edges=add_edge(curr,grid[p2],steps, edges)
        elif grid[p2] == '.':
            explore(curr, p2, v1, steps)

    v2 = v[:]
    p2 = (p[0], p[1]+1)
    if p2 not in v2:
        v2.append(p2)
        if grid[p2] not in '#.':
            edges=add_edge(curr,grid[p2],steps, edges)
        elif grid[p2] == '.':
            explore(curr, p2, v2, steps)

    v3 = v[:]
    p2 = (p[0], p[1] - 1)
    if p2 not in v3:
        v3.append(p2)
        if grid[p2] not in '#.':
            edges=add_edge(curr,grid[p2],steps, edges)
        elif grid[p2] == '.':
            explore(curr, p2, v3, steps)

    v4 = v[:]
    p2 = (p[0]-1, p[1] )
    if p2 not in v4:
        v4.append(p2)
        if grid[p2] not in '#.':
            edges=add_edge(curr,grid[p2],steps, edges)
        elif grid[p2] == '.':
            explore(curr, p2, v4, steps)

for s in stuff:
    explore(s, stuff[s], [stuff[s]], 0)

def remove_key(n,edges_param):
    temp_edges = {e:edges_param[e] for e in edges_param}
    #remove key
    edg = {e for e in temp_edges if n in e}
    for edge1 in edg:
        for edge2 in edg:
            if edge1!=edge2:
                s1 = edge1.replace(n,'')
                s2 = edge2.replace(n,'')
                if s1 in '1234':
                    if s1+s2 in temp_edges: temp_edges.pop(s1+s2)
                    temp_edges = add_edge(s1, s2, temp_edges[edge2], temp_edges)
                else: temp_edges = add_edge(s1,s2,temp_edges[edge1]+temp_edges[edge2], temp_edges)
    for e in edg:
        temp_edges.pop(e)
    return temp_edges

def remove_door(n, edges_param):
    #remove door
    temp_edges = {e: edges_param[e] for e in edges_param}
    n=n.upper()
    edg = {e for e in temp_edges if n in e and n!='@' and n not in '1234'}
    for edge1 in edg:
        for edge2 in edg:
            if edge1 != edge2:
                s1 = edge1.replace(n, '')
                s2 = edge2.replace(n, '')
                temp_edges = add_edge(s1, s2, temp_edges[edge1] + temp_edges[edge2], temp_edges)
    for e in edg: temp_edges.pop(e)
    return temp_edges

import time

min = 999999999
visited={}

def do_something(_all_r, _edges, steps, _keychain):
    all_r = _all_r[:]
    #remove door
    global min
    global visited
    possible_keys = []
    for r in all_r:
        possible_keys+=[(e.replace(r,''),e,r) for e in _edges if r in e and e.replace(r,'').islower()]
    possible_keys=list(set(possible_keys))
    if len(possible_keys)==0:
        if steps < min:
            min=steps
            print(steps)
    for (k,e,r) in possible_keys:
        stps = _edges[e]
        edges_wo_door = remove_door(k, _edges)
        new_edges = remove_key(k, edges_wo_door)
        new_keychain = _keychain[:]
        new_keychain.append(k)
        do_something(['1','2','3','4'],new_edges, steps+stps, new_keychain)


do_something(['1','2','3','4'],edges,0,  [])


#doesnt terminate, needs value caching like in part1 but after some seconds the last value is the correct answer ;)
