input = open('input.txt', 'r').read()
res = sum([
    sum([s[i]>s[i+1] for i in range(len(s)-1)])==0
     and
    2 in [len(x) for x in (''.join([s[j] if s[j]==s[j+1] else s[j]+',' for j in range(len(s)-1)])+s[-1]).split(',')]
    for s in [str(i) for i in range(int(input.split('-')[0]),int(input.split('-')[1])+1)]
])
print(res)




