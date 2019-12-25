import os

os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2019\\22\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()

tecs = puzzle_input.split('\n')

m = 119315717514047
n = 101741582076661
pos = 2020
algs = { 'deal with': lambda x,m,a,b: (a*x %m, b*x %m),
         'deal into': lambda _,m,a,b: (-a %m, (m-1-b)%m),
         'cut ': lambda x,m,a,b: (a, (b-x)%m) }
a,b = 1,0
for t in tecs:
    func  =  [algs[f] for f in algs if f in t][0]
    val = int(t.split(' ')[-1]) if 'increment' in t or 'cut' in t else 0
    a,b = func(val, m, a, b)
print(a,b)
r = (b * pow(1-a, m-2, m)) % m   #inverse von 1-a: (1-a)^-1  = (1-a)^m-2
print(((pos - r) * pow(a, n*(m-2), m) + r) % m) #a^(-n) mod m = a^(n(m-2)) mod m

#had to read about aritmetico geometric series and modinverse here..
