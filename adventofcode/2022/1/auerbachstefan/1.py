import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\1\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n\n')

cal_max = max([sum([int(x) for x in i.split("\n")]) for i in input])
print(cal_max)