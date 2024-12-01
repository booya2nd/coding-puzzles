import re
from collections import Counter

with open('input.txt') as f:
    text = f.read().strip()

numbers = list(map(int, re.findall(r'\d+', text)))
l, r = numbers[::2], numbers[1::2]

counts = Counter(r)
result = sum(n * counts[n] for n in l)
print(result)
