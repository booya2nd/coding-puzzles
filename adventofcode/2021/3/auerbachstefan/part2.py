import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2021\\3\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

ogr = [i for i in input]
for idx in range(12):
    tmp=[s[idx] for s in ogr]
    tmp2 = {t:tmp.count(t) for t in ['0', '1']}
    mc = str(int(tmp2['1']>=tmp2['0']))
    ogr = [o for o in ogr if o[idx]==mc]

csr = [i for i in input]
for idx in range(12):
    tmp=[s[idx] for s in csr]
    tmp2 = {t:tmp.count(t) for t in ['0', '1']}
    mc = '0' if tmp2['0'] <= tmp2['1'] else '1'
    csr = [o for o in csr if o[idx]==mc]
    if len(csr)==1: break


print(int(ogr[0],2)*int(csr[0],2))