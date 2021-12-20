import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2021\\6\\auerbachstefan')
input = open('input.txt', 'r').read().split(",")
input = [int(i) for i in input]

currentState = {i:input.count(i) for i in list(set(input))}

def one_day(currentState):
    newState= {}
    for d in currentState:
        if d>0:
            if d-1 not in newState:
                newState[d-1]=currentState[d]
            else:
                newState[d-1]=newState[d-1]+currentState[d]
        elif d==0:
            newState[8]=currentState[d]
            if 6 not in newState:
                newState[6]=currentState[d]
            else:
                newState[6]=newState[6]+currentState[d]
    return newState

for c in range(256):
    currentState=one_day(currentState)

print("total fish: ", sum([currentState[s] for s in currentState]))