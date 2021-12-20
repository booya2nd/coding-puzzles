import os
import statistics
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2021\\8\\auerbachstefan')
input = open('input.txt', 'r').read().split("\n")

cnt=0

for i in input:
    output = i.split(" | ")[1].split(" ")
    cnt=cnt+ len([o for o in output if len(o) in [2,3,4,7]])

print(cnt)
