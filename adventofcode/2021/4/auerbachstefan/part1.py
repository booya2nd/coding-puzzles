import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2021\\4\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

rng = [int(i) for i in input[0].split(",")]

boards = []

r = 2

while r<len(input):
    boards.append({"h":input[r:r+5]})
    r=r+6

for b in boards:
    for i in range(5):
        b["h"][i] = [int(c) for c in b["h"][i].split(" ") if c != '']
    b["v"]=[]
    for i in range(5):
        b["v"].append([r[i] for r in b["h"]])

def bingo(rng, boards):
    for nr in rng:
        for b in boards:
            for dir in ["h","v"]:
                for i in range(5):
                    if nr in b[dir][i]:
                        b[dir][i].remove(nr)
                        if len(b[dir][i])==0:
                            return(nr, b[dir])

res = bingo(rng, boards)

print(res[0] *    sum([sum(r) for r in res[1]]) )