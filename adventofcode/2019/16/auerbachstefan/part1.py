import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2019\\16\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()

signal = puzzle_input

#signal = '12345678'

pattern=[0,1,0,-1]

for c in range(100):
    print(c)
    new_signal=''
    for pos in range(1,len(signal)+1):
        new_pattern=[r for r in pattern for k in range(pos)][0:len(signal)]
        new_signal+=str(sum([int(signal[i])*new_pattern[(i+1) % len(new_pattern)] for i in range(len(signal))]))[-1]
    signal=new_signal
print(signal[0:8])