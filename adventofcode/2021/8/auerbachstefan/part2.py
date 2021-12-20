import os
import statistics
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2021\\8\\auerbachstefan')
input = open('input.txt', 'r').read().split("\n")

cnt=0

for i in input:
    output = i.split(" | ")[1].split(" ")
    codes = i.split(" | ")[0].split(" ")
    deco={}
    deco[1] = [c for c in codes if len(c) == 2][0]
    deco[4] = [c for c in codes if len(c) == 4][0]
    deco[7] = [c for c in codes if len(c) == 3][0]
    deco[8] = [c for c in codes if len(c) == 7][0]

    print(deco)

