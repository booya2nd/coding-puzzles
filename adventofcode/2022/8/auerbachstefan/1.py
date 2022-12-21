import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\8\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

trees = {}

for y in range(len(input)):
    for x in range(len(input[y])):
        trees[(x,y)]="o"

for y in range(len(input)):
    for x in range(len(input[y])):
        row = input[y]
        col = [r[x] for r in input]

        current_tree_height = row[x]

        before_row =row[:x]
        after_row = row[x+1:]

        before_taller_row = [t for t in before_row if t >= current_tree_height]
        after_taller_row = [t for t in after_row if t>= current_tree_height]

        before_col = col[:y]
        after_col = col[y+1:]

        before_taller_col = [t for t in before_col if t>=current_tree_height]
        after_taller_col = [t for t in after_col if t>=current_tree_height]

        if len(after_taller_row)==0 or len(before_taller_row)==0 or len(before_taller_col)==0 or len(after_taller_col)==0:
            trees[(x,y)]="x"

v = 0

for y in range(len(input)):
    tree_row = "".join([trees[(x,y)] for x in range(len(input[y]))])
    v = v+tree_row.count('x')
    print(tree_row)

print(v)