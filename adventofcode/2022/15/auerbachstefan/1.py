import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\15\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')
#input = open("input2.txt", "r").read().split("\n")

check_row = 2000000

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

#left_end = min([s["sensor"][0]-s["distance"] for s in sb])
#right_end = max([s["sensor"][0]+s["distance"] for s in sb])
#positions = [p for p in range(left_end, right_end+1)]

colliding_sensors = [s for s in sb if abs(s["sensor"][1]-check_row)<s["distance"]]

nb = []

for c in colliding_sensors:
    xdist = c["distance"]-abs(c["sensor"][1]-check_row)
    no_beacon = range(c["sensor"][0]-xdist, c["sensor"][0]+xdist+1)
    nb = list(set(nb + [p for p in no_beacon]))

beacons = list(set([s["beacon"][0] for s in sb if s["beacon"][1]==check_row]))
nb = [n for n in nb if n not in beacons]

print(len(nb))