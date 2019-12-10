import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\08\\auerbachstefan')

s=open('input.txt', 'r').read()
f = [None for i in range(150)]
for i in range(len(s)):
    p = i % 150
    if (f[p]==None and s[i]!='2'):
        f[p] = s[i]

res = ''.join(f)

for r in range(6):
    print('##  ',res[r*25:r*25+25].replace('1','xx').replace('0','  '))

##  xxxxxxxx  xx    xx    xxxx    xx    xx  xx
##  xx        xx  xx    xx    xx  xx    xx  xx
##  xxxxxx    xxxx      xx    xx  xxxxxxxx  xx
##  xx        xx  xx    xxxxxxxx  xx    xx  xx
##  xx        xx  xx    xx    xx  xx    xx  xx
##  xx        xx    xx  xx    xx  xx    xx  xxxxxxxx