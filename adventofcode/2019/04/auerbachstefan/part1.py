def go(a,b):
    c=0
    i=a
    while i <= b:
        s = str(i)
        if sum([s[i]>s[i+1] for i in range(len(s)-1)])==0 and len(set([x for x in s]))<=5:
            c=c+1
        i=i+1
    return c

input = open('input.txt', 'r').read()
res = go(int(input.split('-')[0]),int(input.split('-')[1]))
print(res)