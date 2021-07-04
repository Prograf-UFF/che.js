const CHE = require('./che/che')

let che_base = new CHE()
che_base.loadPly('ply_example/tetrahedron.ply').then(resposta => {

  let arg = parseInt(process.argv[2])
  let relationTest = !isNaN(arg) ? arg : 1;

  // console.log(`Calculating vertices in the star of Vertex: ${relationTest}`)
  // let starOf1 = che_base.relation00(relationTest);
  // console.log(`L0: ${starOf1}`)
  // che_base.loadCheL1();
  // starOf1 = che_base.relation00(relationTest);
  // // console.log(che_base._level1._tableConnected)
  // console.log(`L1: ${starOf1}`)

  // che_base.loadCheL2();
  // starOf1 = che_base.relation00(relationTest);
  // console.log(`L2: ${starOf1}`)

  // che_base.cleanCheL3();
  // che_base.cleanCheL2();
  // che_base.cleanCheL1();
  // console.log(`Calculating Triangles in the star of  Vertex:${relationTest}`);
  // let triangleStarOf1 = che_base.relation02(relationTest);
  // console.log(`L0: ${triangleStarOf1}`);


  // che_base.loadCheL1();
  // triangleStarOf1 = che_base.relation02(relationTest);
  // console.log(`L1: ${triangleStarOf1}`);


  // che_base.loadCheL2();
  // triangleStarOf1 = che_base.relation02(relationTest);
  // console.log(`L2: ${triangleStarOf1}`);

  // che_base.cleanCheL3();
  // che_base.cleanCheL2();
  // che_base.cleanCheL1();

  console.log(`Caclculating the vetices in the star of edge: ${relationTest}`)
  let vertexStarOfEdge0 = che_base.relation10(relationTest);
  console.log(`L0: ${vertexStarOfEdge0}`);

  che_base.loadCheL1();
  let vertexStarOfEdge1 = che_base.relation10(relationTest);
  console.log(`L1: ${vertexStarOfEdge1}`);



})