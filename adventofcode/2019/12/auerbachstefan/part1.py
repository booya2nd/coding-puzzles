import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\12\\auerbachstefan')
moons = open('input.txt', 'r').read().split('\n')

moons = [{'pos':[int(p.split('=')[1].replace('>','')) for p in m.split(',')], 'vel':[0,0,0]} for m in moons]

def sign(x):
    return 0 if x == 0 else x/abs(x)

def update_vel():
    for i in range(len(moons)):
        for j in range(i+1, len(moons)):
            gi =[sign(moons[j]['pos'][0] - moons[i]['pos'][0]),
                 sign(moons[j]['pos'][1] - moons[i]['pos'][1]),
                 sign(moons[j]['pos'][2] - moons[i]['pos'][2])]
            gj = [-gi[0], -gi[1], -gi[2]]
            moons[i]['vel']=[moons[i]['vel'][0]+  gi[0],
                             moons[i]['vel'][1] + gi[1],
                             moons[i]['vel'][2] + gi[2]]
            moons[j]['vel'] = [moons[j]['vel'][0] + gj[0],
                               moons[j]['vel'][1] + gj[1],
                               moons[j]['vel'][2] + gj[2]]

def update_pos():
    for m in moons:
        m['pos']=[
            m['pos'][0] + m['vel'][0],
            m['pos'][1] + m['vel'][1],
            m['pos'][2] + m['vel'][2]
        ]

def get_energy():
    return sum([sum([abs(p) for p in m['pos']])*sum([abs(v) for v in m['vel']]) for m in moons])


for i in range(1000):
    update_vel()
    update_pos()
    print(get_energy())

for m in moons:
    print(m)