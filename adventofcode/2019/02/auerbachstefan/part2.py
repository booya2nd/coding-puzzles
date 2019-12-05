import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\02\\auerbachstefan')

for noun in range(38,39):
    for verb in range(50,100):
        input = open('input.txt', 'r').read()

        prog = input.split(',')
        prog = [int(p) for p in prog]

        prog[1]=noun
        prog[2]=verb

        pos=0

        while prog[pos]!=99:
            if prog[pos]==1:
                prog[prog[pos+3]] = prog[prog[pos+1]]+prog[prog[pos+2]]
            if prog[pos]==2:
                prog[prog[pos+3]] = prog[prog[pos+1]]*prog[prog[pos+2]]
            pos=pos+4

        print(noun, ' ', verb, ' ', prog[0])
        if prog[0]==19690720:
            res = 100*noun+verb
            print('res ',res)