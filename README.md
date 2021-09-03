# What is che.js?
che.js is an implementation of the Compact Half-Edge(CHE) data structure for triangular meshes in Javascript. 



# Why use che.js?
The main goal of che.js is to provide a scalable structure for meshes, so you can scale your memory usage according to your needs.

che.js is split in 4 levels, each of them increasing the amount of information you have.

## Levels
0. The first level of che.js is the 



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