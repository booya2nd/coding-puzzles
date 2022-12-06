import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\6\\auerbachstefan')
input = open('input.txt', 'r').read()

for c in range(len(input)):
    marker = input[c:c+4]
    if len(list(set(marker)))==4:
        print(c+4)
        break