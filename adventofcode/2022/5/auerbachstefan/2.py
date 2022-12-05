import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\5\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

cut = input.index('')
stacks_input = input[:cut-1]
moves = input[cut+1:]

stacks = []

while list(set(stacks_input)) != ['']:
    stack = []
    for i in range(0, len(stacks_input)):
        idx = len(stacks_input)-i-1
        print(idx)
        crate = stacks_input[idx][0:3]
        if crate != '   ':
            stack.append(stacks_input[idx][0:3])
        stacks_input[idx] = stacks_input[idx][4:]
    stacks.append(stack)

print(stacks)

for m in moves:
    how_many = int((m.split('move ')[1]).split(' ')[0])
    from_stack = int((m.split('from ')[1]).split(' ')[0])
    to_stack = int((m.split('to ')[1]).split(' ')[0])

    crates = stacks[from_stack-1][-how_many:]
    stacks[from_stack - 1] = stacks[from_stack-1][:-how_many]
    stacks[to_stack-1] = stacks[to_stack-1]+crates

res = "".join([s[-1] for s in stacks]).replace("[","").replace("]","")
print(res)