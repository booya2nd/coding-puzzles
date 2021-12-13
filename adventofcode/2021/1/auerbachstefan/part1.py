import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2021\\1\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

res = len([ i for i in range(len(input)-1) if int(input[i])<int(input[i+1])])

print(res)