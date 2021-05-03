/**
 * cheL0.js - Compact Half Edge data structure in JavaScript
 *
 * @author Marcos Lage <mlage@ic.uff.br>
 *
 * Federal Fluminense University
 * Computer Science Institute
 * Prograf Lab. (http://prograf.ic.uff.br)
 */

class CheL0 {

  /** CHE_L0 Structure
   *
   * Creates a Soup of triangles, storing the
   * coordinate of the vertices of a triangulated
   * mesh (_tableGeometry) and the indices of each 
   * triangle (_tableVertices).*/

  constructor(tableG, tableV) {
    //Number of vertices in the mesh
    this._nVertex = tableG.length;

    //Number of triangles in the mesh
    this._nTriangle = tableV.length / 3;


    //Coordinates of each vertex of the mesh
    this._tableGeometry = tableG;

    //Indices of the triangles in the mesh
    this._tableVertices = tableV;
  }

  get vertexCount() {
    //Returns the number of vertices of the model
    return this._nVertex;
  }
  get triangleCount() {
    //Returns the number of triangles of the model
    return this._nTriangle;
  }
  get halfEdgeCount() {
    return 3 * this._nTriangle;
  }

  isValidVertex(vId) {
    // returns False if invalid, else retursn the vertex
    return vId >= 0 && vId < this.vertexCount && this._tableGeometry[vId];
  }
  isValidHalfEdge(heId) {
    // Checks if a half-edge is valid
    return heId >= 0 && heId < this.halfEdgeCount && heId < this._tableVertices.length;
  }

  getVertex(vId) {
    if (this.isValidVertex(vId)) {
      return this._tableGeometry[vId];
    }
    return null;
  }
  getHalfEdgeVertex(heId) {
    if (this.isValidHalfEdge(heId)) {
      return this._tableVertices[heId];
    }
    return null;
  }

  setVertex(vId, geometry) {
    this._tableGeometry[vId] = geometry;
  }
  setHalfEdgeVertex(heId, vId) {
    this._tableVertices[heId] = vId;
  }

  triangle(heId) {
    return Math.floor(heId / 3);
  }
  nextHalfEdge(heId) {
    if (this.isValidHalfEdge(heId)) {
      return 3 * this.triangle(heId) + (heId + 1) % 3;
    }
    return null;
    
  }
  previousHalfEdge(heId) {
    return 3 * this.triangle(heId) + (heId + 2) % 3;
  }


  relation00(vertexId) {
    const vertices = new Set();
    for (let heId = 0; heId < this.halfEdgeCount; heId++) {
      if (this.getHalfEdgeVertex(heId) === vertexId) {

        //The next and previous half edges are all in the same triangle
        //Therefore, they are part of the star of vId
        const nextHalfEdge = this.nextHalfEdge(heId);
        const vertexNextHalfEdge = this.getHalfEdgeVertex(nextHalfEdge);
        const previousHalfEdge = this.previousHalfEdge(heId);
        const vertexPreviousHalfEdge = this.getHalfEdgeVertex(previousHalfEdge);
        
        vertices.add(vertexNextHalfEdge);
        vertices.add(vertexPreviousHalfEdge);
      }
    }
    //transform set into array
    return [...vertices];
  }

  relation01(vId) {
    const halfEdges = [];

    for (let heId = 0; heId < this.nHalfEdge; heId++) {
      if (this.getHalfEdgeVertex(heId) === vId) {
        const nextHe = this.nextHalfEdge(heId);
        halfEdges.push(nextHe);
      }
    }

    return halfEdges;
  }

  relation02(vId) {
    const triangles = [];

    for (let heId = 0; heId < this.nHalfEdge; heId++) {
      if (this.getHalfEdgeVertex(heId) === vId) {
        const trigHe = this.triangle(heId);
        triangles.push(trigHe);
      }
    }

    return triangles;
  }
}

module.exports = CheL0