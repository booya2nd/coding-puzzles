import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\06\\auerbachstefan')
input = [i.split(')') for i in open('input.txt', 'r').read().split('\n')]

def get_orbits(base, orbits, level):
    level+=1
    childs=  [i for i in orbits if i[0]==base]
    return level*len(childs)+sum([get_orbits(c[1], orbits,level) for c in childs])

res = get_orbits('COM', input, 0)
#314247