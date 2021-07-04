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

  isValidVertex(vertexId) {
    // returns False if invalid, else retursn the vertex
    return vertexId >= 0 && vertexId < this.vertexCount && this._tableGeometry[vertexId];
  }
  isValidHalfEdge(heId) {
    // Checks if a half-edge is valid
    return heId >= 0 && heId < this.halfEdgeCount && heId < this._tableVertices.length;
  }

  getVertex(vertexId) {
    if (this.isValidVertex(vertexId)) {
      return this._tableGeometry[vertexId];
    }
    return null;
  }
  getHalfEdgeVertex(heId) {
    if (this.isValidHalfEdge(heId)) {
      return this._tableVertices[heId];
    }
    return null;
  }

  setVertex(vertexId, geometry) {
    this._tableGeometry[vertexId] = geometry;
  }
  setHalfEdgeVertex(heId, vertexId) {
    this._tableVertices[heId] = vertexId;
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
    if (!this.isValidVertex(vertexId)) {
      throw Error(`Vertex Star ERROR: Invalid vertex id: ${vertexId}`)
    }
    const vertices = new Set();
    for (let heId = 0; heId < this.halfEdgeCount; heId++) {
      if (this.getHalfEdgeVertex(heId) === vertexId) {

        //The next and previous half edges are all in the same triangle
        //Therefore, they are part of the star of vertexId
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


  relation02(vertexId) {
    if (!this.isValidVertex(vertexId)) {
      throw Error(`Vertex Star ERROR: Invalid vertex id: ${vertexId}`)
    }
    // Computes the triangles of the star of a given vertex
    const triangles = [];
    for (let heId = 0; heId < this.halfEdgeCount; heId++) {
      if (this.getHalfEdgeVertex(heId) === vertexId) {
        const trigHe = this.triangle(heId);
        triangles.push(trigHe);
      }
    }

    return triangles;
  }

  relation10(halfEdgeId) {
    //Computes the vertices in the star of a given edge
    if (
      !this.isValidHalfEdge(halfEdgeId) ||
      !this.isValidHalfEdge(this.nextHalfEdge(halfEdgeId))
    ) {
      throw Error(`Edge Star ERROR: Invalid edge id: ${halfEdgeId}`)
    }
    const vertices = new Set();

    let vertex = this.getHalfEdgeVertex(halfEdgeId)
    let vertexAux = this.getHalfEdgeVertex(this.nextHalfEdge(halfEdgeId))

    vertices.add(this.getHalfEdgeVertex(this.previousHalfEdge(halfEdgeId)))

    for (let halfEdgeIndex = 0; halfEdgeIndex < this.halfEdgeCount; halfEdgeIndex++) {
      if (vertexAux == this.getHalfEdgeVertex(halfEdgeIndex) &
        vertex == this.getHalfEdgeVertex(this.nextHalfEdge(halfEdgeIndex))) {
        vertices.add(this.getHalfEdgeVertex(this.previousHalfEdge(halfEdgeIndex)))
        break;
      }

    }

    //transform set into array
    return [...vertices];
  }

  relation12(halfEdgeId) {

    //Computes the vertices in the star of a given edge
    if (!this.isValidHalfEdge(halfEdgeId)) {
      throw Error(`Edge Star ERROR: Invalid edge id: ${halfEdgeId}`)
    }
    const triangles = new Set();

    let vertex = this.getHalfEdgeVertex(halfEdgeId)
    let vertexAux = this.getHalfEdgeVertex(this.nextHalfEdge(halfEdgeId))

    triangles.add(this.triangle(halfEdgeId));
    console.log(halfEdgeId)
    for (let halfEdgeIndex = 0; halfEdgeIndex < this.halfEdgeCount; halfEdgeIndex++) {
      if (vertexAux == this.getHalfEdgeVertex(halfEdgeIndex) &
        vertex == this.getHalfEdgeVertex(this.nextHalfEdge(halfEdgeIndex))) {
        triangles.add(this.triangle(halfEdgeIndex))
        break;
      }

    }
    return [...triangles]
  }
}

module.exports = CheL0