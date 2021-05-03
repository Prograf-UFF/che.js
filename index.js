const CHE = require('./che/che')

let che_base = new CHE()
che_base.loadPly('ply_example/teapot.ply').then( resposta => {

  let arg = parseInt(process.argv[2])
  console.log(arg);
  let relationTest = arg != null ? arg : 1;

  console.log(`Calculating Star of ${relationTest}`)
  let starOf1 = che_base.relation00(relationTest);
  console.log(starOf1);

  
  che_base.loadCheL1();
  starOf1 = che_base.relation00(relationTest);
  console.log(starOf1);
  
  che_base.loadCheL2();
  starOf1 = che_base.relation00(relationTest);
  console.log(starOf1);
  
})