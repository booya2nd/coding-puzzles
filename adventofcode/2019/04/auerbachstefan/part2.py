def go2(a,b):
    c=0
    i=a
    while i <= b:
        s = str(i)
        if sum([s[i]>s[i+1] for i in range(len(s)-1)])==0:
            if 2 in [len(x) for x in (''.join([s[j] if s[j]==s[j+1] else s[j]+',' for j in range(len(s)-1)])+s[-1]).split(',')]:
                c=c+1
        i=i+1
    return c

input = open('input.txt', 'r').read()
res = go2(int(input.split('-')[0]),int(input.split('-')[1]))
print(res)
