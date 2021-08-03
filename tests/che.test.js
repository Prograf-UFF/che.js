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
test('L1: Check if L1 is loaded', () => {
  che_base.loadCheL1()
  expect(che_base.level1).toBeTruthy();
})

test('L1: Check if opposite table size is equal to 3 * triangleCount', () => {
  expect(che_base.level1.checkOppositeTableSize()).toBe(true);
})

test('L1: Check if connected table size is equal to vertexCount', () => {
  expect(che_base.level1.checkConnectedTableSize()).toBe(true);
})

test('L1: Check if opposite of valid opposites is itself', () => {
  expect(che_base.level1.checkOpposites()).toBe(true);
})

test('L1: Check if triangle is oriented', () => {
  expect(che_base.level1.checkOrientation()).toBe(true);
})

//Level 2
test('L2: Check if L2 is loaded', () => {

  che_base.loadCheL2()
  expect(che_base.level2).toBeTruthy();
})


test('L2: Check if vertex half edge table size is equal to vertexCount', () => {

  expect(che_base.level2.checkVertexfHalfEdgeTable()).toBe(true);
})

test('L2: Check if all vertex half edges have valid values', () => {

  expect(che_base.level2.checkValidVertexHalfEdge()).toBe(true);
})

//Level 3

test('L3: Check if L3 is loaded', () => {

  che_base.loadCheL3()
  expect(che_base.level3).toBeTruthy();
})

test('L3: Check if curve half edge table size is equal to nCurves', () => {

  expect(che_base.level3.checkTableCurveHalfEdge()).toBe(true);
})

test('L3: Check if all opposites are less than nCurves', () => {

  expect(che_base.level3.checkOpposites()).toBe(true);
})

test('CHE: Unload L3', () => {
  che_base.cleanL3()
  expect(che_base.level3).toBe(null);
})

test('CHE: Unload L2', () => {
  che_base.cleanL2()
  expect(che_base.level2).toBe(null);
})


test('CHE: Unload L1', () => {
  che_base.cleanL1()
  expect(che_base.level1).toBe(null);
})