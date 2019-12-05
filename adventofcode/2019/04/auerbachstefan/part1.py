import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\04\\auerbachstefan')
input = [int(i) for i in open('input.txt', 'r').read().split('-')]
res = sum([sum([s[i] > s[i + 1] for i in range(len(s) - 1)]) == 0 and len(set([x for x in s]))<=5
    for s in [str(i) for i in range(input[0], input[1] + 1)]])
print(res)
