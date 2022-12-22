import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\13\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

import ast
import copy

signals = [ast.literal_eval(x) if x != '' else '' for x in input]
signals = [s for s in signals if s != '']
signals = signals + [[[2]]] + [[[6]]]

def compare(left, right):
    res = None
    while True and not (len(left)==0 and len(right)==0):
        if len(left)==0 and len(right)>0:
            return "correct"
        elif len(right)==0 and len(left)>0:
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
                    return "correct"
                elif x>y:
                    return "incorrect"
                elif x==y:
                    continue

def bubble_sort(array):
    n = len(array)
    for i in range(n):
        already_sorted = True
        for j in range(n - i - 1):
            if compare(copy.deepcopy(array[j]) , copy.deepcopy(array[j + 1]))=='incorrect':
                a,b = array[j + 1], array[j]
                array[j], array[j + 1] = a,b
                already_sorted = False
        if already_sorted:
            break
    return array

sorted_signals = bubble_sort(copy.deepcopy(signals))

deco_key = (sorted_signals.index([[2]])+1)*(sorted_signals.index([[6]])+1)