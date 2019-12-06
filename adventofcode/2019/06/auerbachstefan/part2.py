import os

os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\06\\auerbachstefan')
input = [i.split(')') for i in open('input.txt', 'r').read().split('\n')]

you_com = []
curr = 'YOU'
while curr !='COM':
    curr = [i for i in input if i[1]==curr][0][0]
    you_com.append(curr)
san = []
curr = 'SAN'
while curr not in you_com:
    curr = [i for i in input if i[1] == curr][0][0]
    san.append(curr)

res = len(san) - 1 + you_com.index(san[-1])
# 514