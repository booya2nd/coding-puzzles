import re

with open('input.txt') as f:
    text = f.read().strip()

numbers = list(map(int, re.findall(r'\d+', text)))
l = sorted(numbers[::2])
r = sorted(numbers[1::2])

result = sum(abs(a - b) for a, b in zip(l, r))
print(result)