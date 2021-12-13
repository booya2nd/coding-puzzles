import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2021\\1\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

input = [int(i) for i in input]

input = [input[k]+input[k+1]+input[k+2] for k in range(len(input)-2)]

res = len([ i for i in range(len(input)-1) if input[i]<input[i+1]])

print(res)