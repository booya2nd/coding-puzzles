import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\1\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n\n')

cal_list = [sum([int(x) for x in i.split("\n")]) for i in input]
cal_list.sort()
top3 = sum(cal_list[-3:])
print(top3)