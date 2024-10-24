// lib/mockProjectStructure.ts

export type FileStructure = { [key: string]: string | FileStructure }

export const mockProjectStructure: FileStructure = {

    'TSPD': {
        'algo.py': `
#k-cheapest insertion
def kci(numbers):
    f5=plt.figure('kci')
    #graph referenzieren
    global K
    K = G.__class__()
    K.add_nodes_from(G)

    OG = ['X','A','B','C','D','E','F']

    new=[]
    newWeite=[]
    newWeiteInnen=[]
    newWeiteAussen=[]
    copy= deepcopy(numbers)
    subtour=copy[0:4]
    insertions=copy[4:7]
    for i in range(3):
        #nächster subtour Knoten einfügen
        new.append(subtour[i])
        #bester Knoten
        bestKnoten=9
        #beste subtour Weite
        bestWeite=9999
        #insertion Kanten
        bestWeite1=999
        bestWeite2=999
        for j in range(3):
            #weite von d(i,v)+d(v,j)
            weite1 = ab[ subtour[i] ][ insertions[j] ]
            weite2 = ab[ insertions[j] ][ subtour[i+1] ]
            weite = weite1 + weite2
            if weite < bestWeite and insertions[j] not in new:
                bestWeite = weite
                bestKnoten = insertions[j]
                bestWeite1=weite1
                bestWeite2=weite2
        #beste insertion einfügen
        newWeiteInnen.append(round(bestWeite,1))
        newWeiteAussen.append(round(bestWeite1,1))
        newWeiteAussen.append(round(bestWeite2,1))
        new.append(bestKnoten)
        
    
    #letzter aus subtour hinzufügen
    new.append( subtour[len(subtour)-1] )
    #depot hinzufügen
    new.append( numbers[len(numbers)-1] )
    #vom letzten zum depot abstand
    newWeiteInnen.append(round( ab[ new[len(new)-2] ][ new[len(new)-1] ] ,1))
    #newWeite(return) bestimmen
    newWeite=deepcopy(newWeiteAussen)
    newWeite.append(round( ab[ new[len(new)-2] ][ new[len(new)-1] ] ,1))
    newWeite.append(None)

    #graphen konstruieren
    edgelistAussen=[]
    edgelistInnen=[]
    #äußerer Graph
    for k in range(len(newWeite)-2):
        K.add_edges_from([(OG[new[k]],OG[new[k+1]])])
        nx.draw_networkx_edge_labels(K,pos,edge_labels={(OG[new[k]],OG[new[k+1]]): str(int(round(newWeite[k],0))) })
        edgelistAussen.append([OG[new[k]],OG[new[k+1]]])

    nx.draw_networkx_edges(K,pos,edgelist=edgelistAussen,edge_color="b",)

    #innerer Graph
    for k in range(6):
        if k % 2 == 0:
            K.add_edges_from([(OG[new[k]],OG[new[k+2]])])   
            edgelistInnen.append([OG[new[k]],OG[new[k+2]]])
    #letzte Kante
    K.add_edges_from([(OG[new[len(new)-2]],OG[new[0]])])
    edgelistInnen.append([OG[new[len(new)-2]],OG[new[0]]])
    nx.draw_networkx_edges(K,pos,edgelist=edgelistInnen,edge_color="g")  

    nx.draw_networkx_nodes(K,pos)
    nx.draw_networkx_labels(K,pos,font_size=10, font_family="sans-serif")


    return new, newWeite


def test(ha):
    edges=[]
    for i in range (len(ha)):
        for j in range (len(ha)):
            if ha[i][j]!=None:
                edges.append((str(i),str(j)))


`,
        'test.py': `
import networkx as nx
import matplotlib.pyplot as plt
import random
n = random.randint(0,22)
print(n)

J = nx.MultiDiGraph(format='png', directed=True)
G = nx.MultiDiGraph(format='png', directed=True)

def erste_methode(pos):
    global G
    
    for node,node2 in zip(node_list[1:],node_list[:len(node_list)-1]):
        G.add_node(node,pos=pos[node])
        G.add_edges_from([(node,node2)])
    nx.draw_networkx_nodes(G,pos)
    nx.draw_networkx_edges(G,pos,edge_color="b")
    nx.draw_networkx_labels(G,pos,font_size=10, font_family="sans-serif")

def test_methode():
    global J
    #J = G.__class__()
    J.add_nodes_from(G)
    
pos={'X':(0,0),'A':(220,20),'B':(270,70),'C':(250,210),'D':(90,60),'E':(120,120),'F':(50,220)}
node_list = ['X','A','B','C','D','E','F']    


print('hallo\`')
erste_methode(pos)
f1=plt.figure('drölf')
plt.show
`,
        'TSPD.py': `
import matplotlib.pyplot as plt
import networkx as nx
import numpy as np
import math
 


    
N=2
G=nx.grid_2d_graph(N,N)
inds=labels.keys()
vals=labels.values()
plt.figure()
nx.draw_networkx(G, pos=pos2, with_labels=True, node_size = 200)

plt.draw()
plt.show()

#pos = dict( (n, n) for n in G.nodes() )
#labels = dict( [(1,'111'), (2,'222'), (3,'333'),(4,'444')])
#nx.relabel_nodes(G,labels,False)
#inds=labels.keys()
#vals=labels.values()
#pos2=dict(zip(vals,inds))
`

    }
}
