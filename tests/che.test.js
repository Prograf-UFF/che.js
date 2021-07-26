const CHE = require("../che/che")

let che_base = new CHE();


//Level 0
test('Check if L0 is loaded', async () => {
  await che_base.loadPly('./ply/cylinder.ply');
  expect(che_base.level0).toBeTruthy();
})
test('Check if vertexCount equals to geometry table size', () => {
  expect(che_base.level0.vertexCount == che_base.level0._tableGeometry.length).toBe(true);
})

test('Check if vertexCount equals to geometry table size', () => {
  expect(che_base.level0.testGeometryTable()).toBe(true);
})

test('Check if triangleCount * 3 equals to vertex table size', () => {
  expect(che_base.level0.testVertexTable()).toBe(true);
})

test('Check if all Half-Edges are valid', () => {
  expect(che_base.level0.testHalfEdges()).toBe(true);
})


//Level 1
test('Check if L1 is loaded', async () => {
  await che_base.loadCheL1()
  expect(che_base.level1).toBeTruthy();
})