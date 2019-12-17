import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2019\\16\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()

signal = puzzle_input
signal = 10000*signal
print(len(signal))
offset = int(signal[:7])
print(offset)
signal = signal[offset:]
signal = [int(s) for s in signal]

for c in range(100):
    print(c)
    for c2 in range(len(signal)-1, 0, -1):
        signal[c2-1] = (signal[c2-1]+signal[c2]) % 10
print(''.join(str(s) for s in signal[:8]))
