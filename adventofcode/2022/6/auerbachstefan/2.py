import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\6\\auerbachstefan')
input = open('input.txt', 'r').read()

for c in range(len(input)):
    marker = input[c:c+14]
    if len(list(set(marker)))==14:
        print(c+14)
        break