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
    return 3 * this._nTriangle;
  }

  isValidVertex(vId) {
    return vId >= 0 && vId < this.nVertex() && this._tableG[vid] != null;
  }
  isValidHalfEdge(heId) {
    return heId >= 0 && heId < this.nHalfEdge() && this._tableV[heId] != null;
  }

  getVertex(vId) {
    if (this.isValidVertex()) {
      return this._tableG[vId];
    }
    return null;
  }
  getVertexOfHalfEdge(heId) {
    if (this.isValidHalfEdge()) {
      return this.tableV[heId];
    }
    return null;
  }

  setVertex(vId, geometry) {
    this._tableG[vId] = geometry;
  }
  setVertexOfHalfEdge(heId, vId) {
    this._tableV[heId] = vId;
  }

  triangle(heId) {
    return Math.floor(heId / 3);
  }
  nextHalfEdge(heId) {
    return 3 * this.triangle(heId) + (heId + 1) % 3;
  }
  previoustHalfEdge(heId) {
    return 3 * this.triangle(heId) + (heId + 2) % 3;
  }


  relation00(vId) {
    const verts = [];

    for (let heId = 0; heId < this.nHalfEdge; heId++) {
      if (this.getVertexOfHalfEdge(heId) === vId) {
        const nextHe = this.nextHalfEdge(heId);
        const vertHe = this.getVertexOfHalfEdge(nextHe);

        verts.push( vertHe );
      }
    }

    return verts;
  }

  relation01(vId) {
    const halfEdges = [];

    for (let heId = 0; heId < this.nHalfEdge; heId++) {
      if (this.getVertexOfHalfEdge(heId) === vId) {
        const nextHe = this.nextHalfEdge(heId);
        halfEdges.push( nextHe );
      }
    }

    return halfEdges;
  }

  relation02(vId) {
    const triangles = [];

    for (let heId = 0; heId < this.nHalfEdge; heId++) {
      if (this.getVertexOfHalfEdge(heId) === vId) {
        const trigHe = this.triangle(heId);
        triangles.push( trigHe );
      }
    }

    return triangles;
  }
}
