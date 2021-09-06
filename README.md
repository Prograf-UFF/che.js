[![NPM Package][npm]][npm-url]
[![NPM Downloads][npm-downloads]][npmtrends-url]

# What is che.js?
che.js is an implementation of the Compact Half-Edge(CHE) data structure for triangular meshes in Javascript. It is an upgrade on the half-edge data structure, which representes each edge as two twin-edges, each part of a triangle.



# Why use che.js?
The main goal of che.js is to provide a scalable structure for meshes, so you can scale your memory usage according to your needs.

che.js is split in 4 levels, each of them increasing the amount of information you have.

## Levels
0. The first level of che.js is the minimal representation of a triangle, all it storages is the geometry informations about the vertices, and which vertices form each triangles.
It does that by storing references to vertices in a table called _tableVertices, each triangle of the mesh is represented by 3 vertice references on this table.

1. The second level of che.js stores the opposites of each half-edge in the mesh, which allows for fast computation of adjacency between triangles.

2. The third level of the structure chooses an half-edge to represent each vertex and edge. It allows for fast discovery of adjacency with vertices, and a simple way to draw independent edges if needed.

3. The fourth level adds information about the boundary curves of a mesh, representing each boundary curve with a half-edge.



# Getting Started

```shell
npm install @che.js/che.js
```
 ⚠⚠⚠ 
 
 Warning: Since che.js uses es6 modules, you have to either name your file with .mjs or explicitly state in your package.json that your project type is "module".
 
 ⚠⚠⚠


## Loading a mesh
Currently che.js only have loaders available for objects in .ply format with x,y,z coordinates, you can find a few examples at the ply folder available on the root of this repository. In this example, we will use `sphere.ply`.


```javascript
import Che from '@che.js/che.js';
import fs from 'fs'

//Load ply file

let plyFile = fs.readFileSync('sphere.ply', 'utf-8');

let cheMesh = new Che()

cheMesh.loadPly(plyFile).then(() => {
  //do whatever you want
})
```


## Finding the vertex star of an vertex

```javascript
cheMesh.loadPly(plyFile).then(() => {
  let start = performance.now()
  let vertexStarOfVertex3 = cheMesh.relation00(3);
  let end = performance.now()
  console.log(`L0 R00: ${end - start}`)
  console.log(vertexStarOfVertex3);

  cheMesh.loadCheL1();
  start = performance.now()
  vertexStarOfVertex3 = cheMesh.relation00(3);
  end = performance.now()
  console.log(`L1 R00: ${end - start}`)
  console.log(vertexStarOfVertex3);


  cheMesh.loadCheL2();
  start = performance.now()
  vertexStarOfVertex3 = cheMesh.relation00(3);
  end = performance.now()
  console.log(`L2 R00: ${end - start}`)
  console.log(vertexStarOfVertex3);
})
```









# More info
You can find more info about the data structure on the following links
- [CHE: A scalable topological data structure for triangular meshes](https://www.academia.edu/24087960/CHE_A_scalable_topological_data_structure_for_triangular_meshes)
- [ESTRUTURAS DE DADOS TOPOLÓGICAS ESCALONÁVEIS PARA VARIEDADES DE DIMENSÃO 2 E 3](https://www.maxwell.vrac.puc-rio.br/colecao.php?strSecao=resultado&nrSeq=8176@1) (chapter 4, in portuguese)


### Change log ###

[Releases](https://github.com/Prograf-UFF/che.js/releases)


[npm]: https://img.shields.io/npm/v/@che.js/che.js
[npm-url]: https://www.npmjs.com/package/@che.js/che.js
[npm-downloads]: https://img.shields.io/npm/dw/@che.js/che.js
[npmtrends-url]: https://www.npmtrends.com/@che.js/che.js