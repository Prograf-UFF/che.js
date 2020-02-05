import './app.scss';

import { DataIO } from './dataIO';

DataIO.readMesh('../assets/test.off').then((mesh) => {
  console.log(mesh);
  // const che = new Che(mesh.tableG, mesh.tableV);

});
