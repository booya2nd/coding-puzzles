import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\3\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

def to_uni_dict(s):
    d={}
    for c in s:
        d[c] = 1
    return list(d)

def filter_prios(l):
    res = {}
    for x in l:
        if l.count(x)>1:
            res[x]=1
    return list(res)

def get_prio(c):
    if c == c.lower():
        return ord(c)-96
    else:
        return ord(c)-38

rucksacks = [
    [
        i[:(len(i)//2)],
        i[(len(i)//2):]
        ]
     for i in input]

bool_rucksacks = [to_uni_dict(r[0]) + to_uni_dict(r[1]) for r in rucksacks]

prio_items = [filter_prios(b) for b in bool_rucksacks]

prios = [sum([get_prio(p1) for p1 in p]) for p in prio_items]

res = sum(prios)
print(res)