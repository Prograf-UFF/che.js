/**
 * cheL0.js - Compact Half Edge data structure in JavaScript
 *
 * @author Marcos Lage <mlage@ic.uff.br>
 *
 * Federal Fluminense University
 * Computer Science Institute
 * Prograf Lab. (http://prograf.ic.uff.br)
 */
import Vertex from "./vertex.js";
export default class CheL0 {

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

  isValidTriangle(triangleId) {
    return this.isValidHalfEdge(3 * triangleId) &&
      this.isValidHalfEdge(3 * triangleId + 1) &&
      this.isValidHalfEdge(3 * triangleId + 2)
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
    let triangle = Math.floor(heId / 3)
    if (this.isValidTriangle(triangle)) {
      return triangle;
    }
    return null
  }

  getTriangleCenter(triId) {
    //Calculates the center point of a triangle
    let g1 = this.getVertex(this.getHalfEdgeVertex(triId * 3));
    let g2 = this.getVertex(this.getHalfEdgeVertex(triId * 3 + 1));
    let g3 = this.getVertex(this.getHalfEdgeVertex(triId * 3 + 2));
    return new Vertex(
      (g1.posX + g2.posX + g3.posX) / 3,
      (g1.posY + g2.posY + g3.posY) / 3,
      (g1.posZ + g2.posZ + g3.posZ) / 3
    )

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
    for (let heId = 0; heId < this.triangleCount * 3; ++heId) {
      if (this.getHalfEdgeVertex(heId) == vertexId) {
        triangles.push(this.triangle(heId));
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

    vertices.add(this.getHalfEdgeVertex(halfEdgeId))

    for (let halfEdgeIndex = 0; halfEdgeIndex < this.halfEdgeCount; halfEdgeIndex++) {
      //Opposites half-edge share the same two vertex, but inverted
      if (vertexAux == this.getHalfEdgeVertex(halfEdgeIndex) &
        vertex == this.getHalfEdgeVertex(this.nextHalfEdge(halfEdgeIndex))) {
        vertices.add(this.getHalfEdgeVertex(halfEdgeIndex))
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
    for (let halfEdgeIndex = 0; halfEdgeIndex < this.halfEdgeCount; halfEdgeIndex++) {
      if (vertexAux == this.getHalfEdgeVertex(halfEdgeIndex) &
        vertex == this.getHalfEdgeVertex(this.nextHalfEdge(halfEdgeIndex))) {
        triangles.add(this.triangle(halfEdgeIndex))
        break;
      }

    }
    return [...triangles]
  }


  relation22(triangleId) {

    //Computes the triangle incidents of a given triangle
    if (!this.isValidTriangle(triangleId)) {
      throw Error(`Triangle Star ERROR: Invalid Triangle id: ${triangleId}`)
    }

    const triangles = new Set()

    let vertex1 = this.getHalfEdgeVertex(3 * triangleId)
    let vertex2 = this.getHalfEdgeVertex(3 * triangleId + 1)
    let vertex3 = this.getHalfEdgeVertex(3 * triangleId + 2)

    for (let halfEdgeId = 0; halfEdgeId < 3 * this.triangleCount; halfEdgeId++) {
      let iteration_vertex = this.getHalfEdgeVertex(halfEdgeId)
      let next_vertex = this.getHalfEdgeVertex(this.nextHalfEdge(halfEdgeId))
      if (vertex2 == iteration_vertex && vertex1 == next_vertex ||
        vertex1 == iteration_vertex && vertex3 == next_vertex ||
        vertex3 == iteration_vertex && vertex2 == next_vertex
      ) {
        triangles.add(this.triangle(halfEdgeId))
      }
    }
    return [...triangles]
  }


  testGeometryTable() {
    //"CHE_L0:: Error: vertexCount != geometry table size"
    if (this.vertexCount != this._tableGeometry.length) {
      return false;
    }
    return true
  }

  testVertexTable() {
    //console.log("CHE_L0:: Error: triangleCount * 3 != vertex table table size")
    if (3 * this.triangleCount != this._tableVertices.length) {
      return false;
    }
    return true
  }

  testHalfEdges() {
    //Checks if all half edges are valid
    for (let i = 0; i < 3 * this.triangleCount; i++) {
      if (this.getHalfEdgeVertex(i) >= this.vertexCount) {
        //console.log(`CHE_L0:: Error V(${i})  >= vertexCount`)
        return false
      }
      if (this.getHalfEdgeVertex(i) < 0) {
        //console.log(`CHE_L0:: Error V(${i})  < 0.`)
        return false
      }
    }
    return true
  }
}