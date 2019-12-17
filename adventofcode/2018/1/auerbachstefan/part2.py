import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2018\\01\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read().split('\n')
fcList = [int(i) for i in puzzle_input]

fList = [0]
f = 0
i=0
#loop once through frequency change list to build final frequencies
#note that the resultings lists would be periodic by just adding the last final frequency to whole list (427 in this case)
#thus, the double frequency must be in the first list and i-j mod 427 must equal 0
#finally all we have to do is find the pairs i,j with minimal loops (i-j)/427 where j comes after i
#out of those, we have to find the j that comes first in the list, the matching i is our result
while i<len(fcList):
    f=f+fcList[i]
    fList.append(f)
    i=i+1

r=None
p=None
res=None

for i in fList:
    for j in fList[fList.index(i)+1:]:
        if i-j % 427 == 0 and (i-j)/427>=0:
            if not r or (i-j)/427 <= r:
                r=(i-j)/427
                if not p or fList.index(j)<p:
                    p=fList.index(j)
                    res = i

print(res)