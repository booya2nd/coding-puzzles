import os
import statistics
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2021\\7\\auerbachstefan')
input = open('input.txt', 'r').read().split(",")
input = [int(i) for i in input]


m = statistics.median(input)

res = sum([abs(i-m) for i in input])

print(res)
