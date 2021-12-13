import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2021\\3\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

mc = []
for idx in range(12):
    tmp=[s[idx] for s in input]
    tmp2 = [(t,tmp.count(t)) for t in list(set(tmp))]
    mc.append( sorted(tmp2, key=lambda x: -x[1]) )

gamma = "".join([m[0][0] for m in mc])
eps = "".join([m[1][0] for m in mc])

print(int(gamma,2)*int(eps,2))