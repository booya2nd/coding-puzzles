import os
import math
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\01\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')
fuels = [math.floor(int(f)/3)-2 for f in input]
res = sum(fuels)
print(res)