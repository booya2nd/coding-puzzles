import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\13\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

import ast

signals = [ast.literal_eval(x) if x != '' else '' for x in input]

def compare(left, right):
    print("Compare", left , "vs", right)
    res = None
    while True and not (len(left)==0 and len(right)==0):
        if len(left)==0 and len(right)>0:
            print("left is out of items")
            return "correct"
        elif len(right)==0 and len(left)>0:
            print("right is out of items")
            return "incorrect"
        else:
            x = left.pop(0)
            y = right.pop(0)
            if type(x) is list and type(y) is int:
                y=[y]
            if type(y) is list and type(x) is int:
                x=[x]
            if type(x) is list and type(y) is list:
                res = compare(x,y)
                if res in ["correct", "incorrect"]:
                    return res
            else:
                if x<y:
                    print("Compare",x, "vs", y, "left is smaller, correct")
                    return "correct"
                elif x>y:
                    print("Compare",x, "vs", y, "right is smaller. incorrect")
                    return "incorrect"
                elif x==y:
                    print("Compare",x, "vs", y, "same same. continue")

signal_output={}
for i in range(len(signals)//3+1):
    print("== Pair", i+1, " ==")
    res = compare(signals[i*3], signals[i*3+1])
    signal_output[i+1] = res
    print(res)
    print()

corrects = [i for i in signal_output if signal_output[i]=='correct']

res = sum(corrects)
print(res)