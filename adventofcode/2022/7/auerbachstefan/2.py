import os
os.chdir('C:\\Users\\omega\\PycharmProjects\\adtec-hacker-games\\adventofcode\\2022\\7\\auerbachstefan')
input = open('input.txt', 'r').read().split('\n')

input.reverse()
cur = ""
fs = []

while len(input)>0:
    i = input.pop()

    #command
    if i[0:7] == '$ cd ..':
        cur = "/".join(cur.split("/")[:-2])+"/"

    elif i[0:4] == '$ cd':
        if cur == '' or cur=='/':
            cur = cur + i.split("$ cd ")[1] + "/"
        else:
            cur = cur + i.split("$ cd ")[1] + "/"
        if cur in fs:
            print("folder already visited, do nothing")
        else:
            fs.append(cur)

    elif i[0:4] == '$ ls':
        print("list system, do nothing")

    elif i[0:3] == 'dir':
        fs.append(cur+i.split("dir ")[1]+"/")

    else:
        fs.append(cur+i)

folders = [(f,0) for f in fs if f.endswith("/")]
files = [f for f in fs if not f.endswith("/")]

for i in range(len(folders)):
    folder = folders[i][0]
    contained_files = [f for f in files if f.startswith(folder)]
    file_size = sum([int((f.split("/")[-1]).split(" ")[0]) for f in contained_files])
    folders[i]=(folder,file_size)

possibles = [f for f in folders if folders[0][1]-f[1]<=40000000]

smallest = min(possibles,key=lambda a:a[1])
print(smallest[1])