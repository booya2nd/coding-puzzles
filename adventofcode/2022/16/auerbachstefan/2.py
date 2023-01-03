import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\15\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')


sb = []
for i in input:
    s,b = i.split(": closest beacon is at ")
    s = s.split("at ")[1]
    print(s,b)
    sposx, sposy = s.split(", ")
    bposx, bposy = b.split(", ")
    sbdict = {"sensor":tuple([int(p.split("=")[1]) for p in [sposx, sposy]]), "beacon":tuple([int(p.split("=")[1]) for p in [bposx, bposy]])}
    sbdict["distance"] = abs(sbdict["sensor"][0]-sbdict["beacon"][0])+abs(sbdict["sensor"][1]-sbdict["beacon"][1])
    sb.append(sbdict)

def is_super_beacon(x,y):
    beacons = [j["beacon"] for j in sb]
    for i in sb:
        sensor = i["sensor"]
        dist = i["distance"]
        if abs(sensor[0]-x)+abs(sensor[1]-y)<=dist and (x,y) not in beacons:
            return False
    return True

for s in sb:
    sx = s["sensor"][0]
    sy = s["sensor"][1]
    d = s["distance"]
    for dx in range(d+2):
        dy = d+1-dx
        for x,y in [(sx+dx,sy+dy), (sx-dx,sy+dy), (sx+dx, sy-dy), (sx-dx, sy-dy)]:
            if not (0<=x<=4000000) or not (0<=y<=4000000):
                continue
            if is_super_beacon(x,y):
                print(x*4000000+y)
                break