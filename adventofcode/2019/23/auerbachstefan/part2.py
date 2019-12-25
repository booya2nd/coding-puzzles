import os

os.chdir('C:\\Users\\Stefan\\PycharmProjects\\aoc\\2019\\23\\auerbachstefan')
puzzle_input = open('input.txt', 'r').read()

prog = puzzle_input.split(',')


class intcode_computer:
    def __init__(self, ip):
        self._prog = {i: int(prog[i]) for i in range(len(prog))}
        self._pos = 0
        self._rel = 0
        self._input = [ip]

    def append_input(self, i):
        self._input.append(i)

    def get_input(self):
        if len(self._input) > 0:
            i = self._input[0]
            self._input = self._input[1:]
        else:
            i = -1
        return (i)

    def get_input_size(self):
        return len(self._input)

    def prog_get(self, i):
        if i not in self._prog:
            self._prog[i] = 0
        return self._prog[i]

    def run_intcode(self):
        while True:
            instr = str(prog[self._pos])
            opcode = int(instr[-2:])
            mode1 = instr[-3:-2] if instr[-3:-2] else '0'
            mode2 = instr[-4:-3] if instr[-4:-3] else '0'
            mode3 = instr[-5:-4] if instr[-5:-4] else '0'

            c1 = self.prog_get(self._pos + 1) if mode1 == '0' else self._pos + 1
            c2 = self.prog_get(self._pos + 2) if mode2 == '0' else self._pos + 2
            c3 = self.prog_get(self._pos + 3) if mode3 == '0' else self._pos + 3

            if mode1 == '2': c1 = self.prog_get(self._pos + 1) + self._rel
            if mode2 == '2': c2 = self.prog_get(self._pos + 2) + self._rel
            if mode3 == '2': c3 = self.prog_get(self._pos + 3) + self._rel

            if opcode == 1:
                self._prog[c3] = self.prog_get(c1) + self.prog_get(c2)
                self._pos = self._pos + 4
            if opcode == 2:
                self._prog[c3] = self.prog_get(c1) * self.prog_get(c2)
                self._pos = self._pos + 4
            if opcode == 3:
                i = self.get_input()
                self._prog[c1] = i
                self._pos = self._pos + 2
                if i == -1:
                    return None
            if opcode == 4:
                self._pos = self._pos + 2
                return self.prog_get(c1)
            if opcode == 5:
                if self._prog[c1] != 0:
                    self._pos = self.prog_get(c2)
                else:
                    self._pos = self._pos + 3
            if opcode == 6:
                if self._prog[c1] == 0:
                    self._pos = self.prog_get(c2)
                else:
                    self._pos = self._pos + 3
            if opcode == 7:
                if self.prog_get(c1) < self.prog_get(c2):
                    self._prog[c3] = 1
                else:
                    self._prog[c3] = 0
                self._pos = self._pos + 4
            if opcode == 8:
                if self.prog_get(c1) == self.prog_get(c2):
                    self._prog[c3] = 1
                else:
                    self._prog[c3] = 0
                self._pos = self._pos + 4
            if opcode == 9:
                self._rel += self.prog_get(c1)
                self._pos = self._pos + 2
            if opcode == 99:
                print('halted')
                return None


cpu = {}
for k in range(50):
    cpu[k] = intcode_computer(k)

nat = (None, None)
r1,r2,r3=None,None,None
import time

while True:
    for k in range(50):
        r1 = cpu[k].run_intcode()
        if r1:
            r2 = None
            while not r2:
                r2 = cpu[k].run_intcode()
            r3 = None
            while not r3:
                r3 = cpu[k].run_intcode()
            if r1 != 255:
                cpu[r1].append_input(r2)
                cpu[r1].append_input(r3)
    if set([cpu[k].get_input_size() for k in range(50)]) == {0} and r2 and r3:
        cpu[0].append_input(r2)
        cpu[0].append_input(r3)
        if nat:
            if nat[1] == r3:
                print(r3)
                break
            nat = (r2, r3)
