const CHE = require("../che/che")

let che_base = new CHE();

test('Check if L0 is loaded', async () => {
  await che_base.loadPly('./ply/cone.ply');
  expect(che_base.level0.check()).toBe(true);
})


test('Check if vertexCount equals to geometry table exists', async () => {
  expect(che_base.level0.vertexCount == che_base.level0._tableGeometry.length).toBe(true);
})