import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\03\\auerbachstefan\\')
input = open('input.txt', 'r').read()

moves1 = input.split('\n')[0].split(',')
moves2 = input.split('\n')[1].split(',')

#moves1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72'.split(',')
#moves2 = 'U62,R66,U55,R34,D71,R55,D58,R83'.split(',')


def get_lines(moves):
    curr = (0, 0)
    lines=[]
    for p in moves:
        dir = p[0]
        steps = int(p[1:])
        if dir == 'U':
            how = 'V'
            new = (curr[0], curr[1]+steps)
        if dir == 'R':
            how = 'H'
            new = (curr[0]+steps, curr[1])
        if dir == 'L':
            how = 'H'
            new = (curr[0]-steps, curr[1])
        if dir == 'D':
            how = 'V'
            new = (curr[0], curr[1]-steps)
        lines.append((how,curr,new))
        curr=new
    return lines

lines1=get_lines(moves1)
lines2=get_lines(moves2)

intersecs=[]
for a in lines1:
    for b in [l for l in lines2 if l[0]!=a[0] and not (l==lines2[0] and a==lines1[0]) ]: #only check horizonals vs verticals and not first pair
        if a[0]=='H':
            h=a
            v=b
        else:
            h=b
            v=a
        i = (v[1][0],h[1][1])
        if (h[1][0] <= i[0] <= h[2][0] or h[1][0] >= i[0] >= h[2][0]) and (v[1][1] <= i[1] <= v[2][1] or v[1][1] >= i[1] >= v[2][1]):
            print(h)
            print(v)
            print(i)
            intersecs.append(i)

manhattans = [abs(i[0])+abs(i[1]) for i in intersecs]
res = min(manhattans)
print(res)