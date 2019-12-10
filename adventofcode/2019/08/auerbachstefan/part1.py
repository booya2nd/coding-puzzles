import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\08\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()

layers=[puzzle_input[int(c*25*6):int((c+1)*25*6)] for c in range(len(puzzle_input)//(25*6))]
a = min([s.count('0') for s in layers])
i = [s.count('0') for s in layers].index(a)
res= layers[i].count('1')*layers[i].count('2')
