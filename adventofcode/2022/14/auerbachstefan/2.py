import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\14\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

world = {}

def get_pts(a,b):
    if a<b:
        return range(a,b+1)
    else:
        return range(b,a+1)

for i in input:
    rock_pts = i.split(" -> ")
    for idx in range(len(rock_pts)-1):
        p1 = rock_pts[idx]
        p2 = rock_pts[idx+1]
        p1x, p1y = [int(p) for p in p1.split(",")]
        p2x, p2y = [int(p) for p in p2.split(",")]
        for x in get_pts(p1x,p2x):
            for y in get_pts(p1y, p2y):
                world[(x,y)]='#'

abyss = max([w[1] for w in world])+2

while True:
    if (500,0) in world and world[(500,0)]=='o':
        print("no new sand possible")
        break
    else:
        sand = (500,0)
        world[sand]='o'
        while True:
            #create ground
            if sand[1]+1==abyss:
                world[(sand[0]  , sand[1] + 1)] = '#'
                world[(sand[0]-1, sand[1] + 1)] = '#'
                world[(sand[0]+1, sand[1] + 1)] = '#'

            if (sand[0], sand[1]+1) not in world or world[(sand[0], sand[1]+1)] not in ['#','o']:
                world[sand]='.'
                sand = (sand[0], sand[1]+1)
                world[sand]='o'
            elif (sand[0]-1, sand[1]+1) not in world or world[(sand[0]-1, sand[1] + 1)] not in ['#', 'o']:
                world[sand] = '.'
                sand = (sand[0]-1, sand[1] + 1)
                world[sand] = 'o'
            elif (sand[0]+1, sand[1]+1) not in world or world[(sand[0]+1, sand[1]+1)] not in ['#','o']:
                world[sand]='.'
                sand = (sand[0]+1, sand[1]+1)
                world[sand]='o'
            else:
                break

print(len([w for w in world if world[w]=='o']))

####pygame stuff
import pygame
pygame.init()
white = (255,255,255)
black = (0,0,0)
red = (255,0,0)
green = (0,255,0)
blue = (0,0,255)
gameDisplay = pygame.display.set_mode((1600,1200))
gameDisplay.fill(black)
##################### end of pygame

pxl_rad = 6

for w in world:
    x,y = w[0],w[1]
    if world[w]=='#':
        pygame.draw.rect(gameDisplay, white, (x * pxl_rad - 400 * pxl_rad - pxl_rad / 2, y * pxl_rad - pxl_rad / 2, pxl_rad, pxl_rad))
    elif world[w]=='o':
        pygame.draw.circle(gameDisplay, green, (x * pxl_rad - 400 * pxl_rad, y * pxl_rad), 2, 2)
pygame.display.update()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            quit()