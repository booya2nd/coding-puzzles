import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\8\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

score = {}

for y in range(len(input)):
    for x in range(len(input[y])):
        row = input[y]
        col = [r[x] for r in input]

        current_tree_height = row[x]

        before_row =row[:x]
        after_row = row[x+1:]

        before_col = col[:y]
        after_col = col[y+1:]

        higher=[str(h) for h in range(10) if h>=int(current_tree_height)]

        r = min([after_row.index(h)+1 if h in after_row else len(after_row) for h in higher])
        print(current_tree_height, after_row, higher,r)
        d = min([after_col.index(h)+1 if h in after_col else len(after_col) for h in higher])

        before_row = before_row[::-1]
        before_col = before_col[::-1]

        l = min([before_row.index(h) + 1 if h in before_row else len(before_row) for h in higher])
        u = min([before_col.index(h) + 1 if h in before_col else len(before_col) for h in higher])

        print(x,y,r,d,l,u)
        score[(x,y)]=r*d*l*u

max_score = max([score[t] for t in score])
print(max_score)