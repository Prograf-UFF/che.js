const CHE = require("../che/che")

let che_base = new CHE();


//Level 0
test('L0: Check if L0 is loaded', async () => {
  await che_base.loadPly('./ply/cylinder.ply');
  expect(che_base.level0).toBeTruthy();
})
test('L0: Check if vertexCount equals to geometry table size', () => {
  expect(che_base.level0.vertexCount == che_base.level0._tableGeometry.length).toBe(true);
})

test('L0: Check if vertexCount equals to geometry table size', () => {
  expect(che_base.level0.testGeometryTable()).toBe(true);
})

test('L0: Check if triangleCount * 3 equals to vertex table size', () => {
  expect(che_base.level0.testVertexTable()).toBe(true);
})

test('L0: Check if all Half-Edges are valid', () => {
  expect(che_base.level0.testHalfEdges()).toBe(true);
})


//Level 1
test('L1: Check if L1 is loaded', async () => {
  che_base.loadCheL1()
  expect(che_base.level1).toBeTruthy();
})

test('L1: Check if opposite table size is equal to 3 * triangleCount', async () => {
  expect(che_base.level1.checkOppositeTableSize()).toBe(true);
})

test('L1: Check if connected table size is equal to vertexCount', async () => {
  expect(che_base.level1.checkConnectedTableSize()).toBe(true);
})

test('L1: Check if opposite of valid opposites is itself', async () => {
  expect(che_base.level1.checkOpposites()).toBe(true);
})

test('L1: Check if triangle is oriented', async () => {
  expect(che_base.level1.checkOrientation()).toBe(true);
})

//Level 2
test('L2: Check if L2 is loaded', async () => {

  che_base.loadCheL2()
  expect(che_base.level2).toBeTruthy();
})


test('L2: Check if vertex half edge table size is equal to vertexCount', async () => {

  expect(che_base.level2.checkVertexfHalfEdgeTable()).toBe(true);
})

test('L2: Check if all vertex half edges have valid values', async () => {

  expect(che_base.level2.checkValidVertexHalfEdge()).toBe(true);
})