import os
import math
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\01\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

def get_fuel(m):
    f = math.floor(m / 3) - 2
    if f <= 0:
        return 0
    else:
        return f+get_fuel(f)

fuels = [get_fuel(int(f)) for f in input]
res = sum(fuels)
print(res)
