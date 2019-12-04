def go2(a,b):
    c=0
    i=a
    while i <= b:
        s = str(i)
        if sum([s[i]>s[i+1] for i in range(len(s)-1)])==0:
            if (s[0]==s[1] and s[1]!=s[2]) or                ( s[0] != s[1] and s[1]==s[2] and s[2] != s[3]) or                (s[1] != s[2] and s[2] == s[3] and s[3] != s[4]) or                (s[2] != s[3] and s[3] == s[4] and s[4] != s[5]) or                  (s[3]!=s[4] and s[4]==s[5]):
                c=c+1
        i=i+1
    return c

input = open('input.txt', 'r').read()
res = go2(int(input.split('-')[0]),int(input.split('-')[1]))
print(res)