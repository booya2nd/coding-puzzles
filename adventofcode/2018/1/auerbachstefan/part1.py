import os
os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2018\\01\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read().split('\n')
res = sum([int(i) for i in puzzle_input])
