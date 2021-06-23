const CHE = require('./che/che')

let che_base = new CHE()
che_base.loadPly('ply_example/opentetrahedron.ply').then(resposta => {

  let arg = parseInt(process.argv[2])
  let relationTest = !isNaN(arg) ? arg : 1;

  console.log(`Calculating vertices in the star of ${relationTest}`)
  let starOf1 = che_base.relation00(relationTest);
  console.log(starOf1);

  che_base.level1 = null;

  che_base.loadCheL1();
  starOf1 = che_base.relation00(relationTest);
  console.log(starOf1);

  che_base.loadCheL2();
  starOf1 = che_base.relation00(relationTest);
  console.log(starOf1);

  che_base.cleanCheL3();
  che_base.cleanCheL2();
  che_base.cleanCheL1();
  console.log(`Calculating Triangles in the star of ${relationTest}`)
  let triangleStarOf1 = che_base.relation02(relationTest);
  console.log(triangleStarOf1);


  che_base.loadCheL1();
  console.log(che_base.level1._tableOpposite)
  triangleStarOf1 = che_base.relation02(relationTest);
  console.log(triangleStarOf1);

})