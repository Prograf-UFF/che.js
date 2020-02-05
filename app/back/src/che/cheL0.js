/**
 * cheL0.js - Compact Half Edge data structure in JavaScript
 *
 * @author Marcos Lage <mlage@ic.uff.br>
 *
 * Federal Fluminense University
 * Computer Science Institute
 * Prograf Lab. (http://prograf.ic.uff.br)
 */

export class CheL0 {
  constructor(tableG, tableV) {
    this._nVertex = tableG.length;
    this._nTriagle = tableV.length / 3;

    this._tableG = tableG;
    this._tableV = tableV;
  }

  get nVertex() {
    return this._nVertex;
  }
  get nTriangle() {
    return this._nTriangle;
  }
  get nHalfEdge() {
    return 3*this._nTriangle;
  }

}
