input = open('input.txt', 'r').read()
res = sum([
    sum([s[i]>s[i+1] for i in range(len(s)-1)])==0
     and
    len(set([x for x in s]))<=5
    for s in [str(i) for i in range(int(input.split('-')[0]),int(input.split('-')[1])+1)]
])
print(res)