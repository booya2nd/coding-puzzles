import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\11\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

def new_worrylevel(monkey, old_level):
    if monkey ==0 :
        return old_level*17
    elif monkey==1:
        return old_level+8
    elif monkey==2:
        return old_level+6
    elif monkey==3:
        return old_level*19
    elif monkey==4:
        return old_level+7
    elif monkey==5:
        return old_level*old_level
    elif monkey==6:
        return old_level+1
    elif monkey==7:
        return old_level+2

items = [
    [52, 60, 85, 69, 75, 75],
  [96, 82, 61, 99, 82, 84, 85],
  [95, 79],
  [88, 50, 82, 65, 77],
  [66, 90, 59, 90, 87, 63, 53, 88],
  [92, 75, 62],
  [94, 86, 76, 67],
  [57]
]

def new_monkey(monkey, level):
    if monkey ==0 :
        return 6 if level % 13 == 0 else 7
    elif monkey==1:
        return 0 if level % 7 == 0 else 7
    elif monkey==2:
        return 5 if level % 19 == 0 else 3
    elif monkey==3:
        return 4 if level % 2 == 0 else 1
    elif monkey==4:
        return 1 if level % 5 == 0 else 0
    elif monkey==5:
        return 3 if level % 3 == 0 else 4
    elif monkey==6:
        return 5 if level % 11 == 0 else 2
    elif monkey==7:
        return 6 if level % 17 == 0 else 2


rounds = 20
monkeys = 8

inspections = [0,0,0,0,0,0,0,0]

for r in range(rounds):
    for m in range(monkeys):
        for i in items[m]:
            inspections[m]=inspections[m]+1
            new_lvl = new_worrylevel(m, i)
            new_lvl = new_lvl // 3
            new_mnk = new_monkey(m, new_lvl)
            items[new_mnk].append(new_lvl)
        items[m]=[]

inspections.sort(reverse=True)
print(inspections[0]*inspections[1])