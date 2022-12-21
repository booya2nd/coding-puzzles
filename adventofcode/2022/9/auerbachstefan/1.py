import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\9\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')


#input = ["R 4","U 4","L 3","D 1","R 4","D 1","L 5","R 2"]

pos = {}

h = (0,0)
t = (0,0)

pos[t]=1

def get_dist(h,t):
    return max(abs(h[0]-t[0]),abs(h[1]-t[1]))

for i in input:
    dir = i[0]
    steps = int(i.split(" ")[1])
    for s in range(steps):
        print("from", h, t, dir)
        if dir == 'L':
            h = (h[0]-1, h[1])
            if get_dist(h,t)>1:
                t=(t[0]-1, h[1])
        elif dir == 'R':
            h = (h[0] + 1, h[1])
            if get_dist(h,t)>1:
                t=(t[0]+1, h[1])
        elif dir == 'U':
            h = (h[0] , h[1]-1)
            if get_dist(h,t)>1:
                t=(h[0], t[1]-1)
        elif dir == 'D':
            h = (h[0] , h[1]+1)
            if get_dist(h,t)>1:
                t=(h[0], t[1]+1)
        #pos[h] = pos[h] + 1 if h in pos else 1
        pos[t] = pos[t] +1 if t in pos else 1
        print("to", h ,t)

print(len(pos))