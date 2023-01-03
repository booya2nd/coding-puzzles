import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\16\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

v = {}

#todo another approach: calculate distances between valves. take all combinations of openable valves that have a sum travel time of <=30
#todo abandon if maximum cant be reached

for i in input:
    i = i.replace("valves", "valve")
    print(i)
    valve = i.split(" ")[1]
    flow = int((i.split("rate=")[1]).split(";")[0])
    tunnels = (i.split(" valve ")[1]).split(", ")
    v[valve]={"flow": flow, "tunnels": tunnels}

for vx in v:
    print(vx, v[vx])

depth=30
max_pressure = 0

import copy

def is_changed(path, valve):
    path=copy.deepcopy(path)
    path.reverse()
    last=path.index(valve)
    if last>0:
        check_open = path[:last]
        opens= [c[0] for c in check_open if c[1]=="opened"]
        closes = [c[0] for c in check_open if c[1]=="closed"]
        both = [o for o in opens if o in closes]
        if len(both)>0:
            return True
    return False

def explore(state):
    global max_pressure
    if state["pressure"]>max_pressure:
        max_pressure=state["pressure"]
        print(state)
    if len(state["path"])<depth:
        last_valve = state["path"][-1]
        open_valves = list(set([v[0] for v in state["path"] if v[1]=="opened"]))
        remaining_open_valves_flow = sum([v[vx]["flow"] for vx in v if v[vx]["flow"]>0 and vx not in open_valves])*(depth-len(state["path"]))
        if state["pressure"]+remaining_open_valves_flow>=max_pressure:
            if last_valve[1]=="closed" and v[last_valve[0]]["flow"]>0:
                new_state={}
                new_state["path"]=state["path"]+[(last_valve[0], "opened")]
                new_state["pressure"]=state["pressure"]+v[last_valve[0]]["flow"]*(depth-len(state["path"]))
                explore(new_state)
            for next in v[last_valve[0]]["tunnels"]:
                new_state={}
                if (next, "opened") in state["path"] and is_changed(state["path"], (next, "opened")):
                    new_state["path"] = state["path"] + [(next, "opened")]
                    new_state["pressure"] = state["pressure"]
                    explore(new_state)
                elif (next, "closed") not in state["path"] or is_changed(state["path"], (next, "closed")):
                    new_state["path"]=state["path"]+[(next, "closed")]
                    new_state["pressure"] = state["pressure"]
                    explore(new_state)
                else:
                    continue

explore({"path":[("AA", "closed")], "pressure":0})
