import os
import statistics
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2021\\7\\auerbachstefan')
input = open('input.txt', 'r').read().split(",")
input = [int(i) for i in input]


m1 = min(input)
m2 = max(input)

final_res = float("inf")

for m in range(m1,m2):
    res = sum([abs(i - m)*(abs(i - m)+1)/2 for i in input])
    if res < final_res:
        final_res = res

print(final_res)

