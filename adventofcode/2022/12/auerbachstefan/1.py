import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\12\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

hm = {}
for y in range(len(input)):
    for x in range(len(input[y])):
        hm[(x,y)]=ord(input[y][x])

start = [x for x in hm if hm[x] == ord('S')][0]
dest = [x for x in hm if hm[x] == ord('E')][0]

hm[start] = ord('a')
hm[dest] = ord('z')

from queue import PriorityQueue
class DijGraph:
    def __init__(self, hm):
        self.v = [x for x in hm]
        self.edges = {}
        self.visited = []

    def add_edge(self, u, v, weight):
        self.edges[(u,v)] = weight

    def refresh(self):
        self.visited=[]

    def dijkstra(self, start_vertex):
        D = {v: (float('inf'), "") for v in self.v}
        D[start_vertex] = (0,[])

        pq = PriorityQueue()
        pq.put((0, start_vertex))

        while not pq.empty():
            (dist, current_vertex) = pq.get()
            self.visited.append(current_vertex)

            for neighbor in self.v:
                if (current_vertex,neighbor) in self.edges:
                    distance = self.edges[(current_vertex,neighbor)]
                    if neighbor not in self.visited:
                        old_cost = D[neighbor][0]
                        new_cost = D[current_vertex][0] + distance
                        if new_cost < old_cost:
                            pq.put((new_cost, neighbor))
                            D[neighbor] = (new_cost, D[current_vertex][1] + [neighbor])
        return D

g = DijGraph(hm)

for n in hm:
    if (n[0]+1,n[1]) in hm and hm[(n[0]+1,n[1])] - hm[n] <=1:
        g.add_edge(n, (n[0]+1,n[1]), 1)
    if (n[0]-1,n[1]) in hm and hm[(n[0]-1,n[1])] - hm[n] <=1:
        g.add_edge(n, (n[0]-1,n[1]), 1)
    if (n[0],n[1]+1) in hm and hm[(n[0],n[1]+1)] - hm[n] <=1:
        g.add_edge(n, (n[0],n[1]+1), 1)
    if (n[0],n[1]-1) in hm and hm[(n[0],n[1]-1)] - hm[n] <=1:
        g.add_edge(n, (n[0],n[1]-1), 1)

res = g.dijkstra(start)
print(res[dest])
