/**
 * cheL0.js - Compact Half Edge data structure in JavaScript
 *
 * @author João Gabriel Moutella <jmoutella@id.uff.br>
 *
 * Federal Fluminense University
 * Computer Science Institute
 * Prograf Lab. (http://prograf.ic.uff.br)
 */

const Che = require("./che");
class CheL1 {
  constructor(che) {
    this._nComponent;

    this._tableOpposite = [];
    this._tableConnected = [];
    this._che = che;
    this.computeOpposite();
    // this.computeConnected();
  }

  getOppositeHalfEdge(heId) {
    if (this._che.isValidHalfEdge(heId)) {
      return this._tableOpposite[heId]
    }
  }

  computeOpposite() {
    this._tableOpposite = new Array(this._che.halfEdgeCount).fill(-1)
    let vertex_1, vertex_2;
    let adjacency = {}
    let verticesPairKey = null;
    for (let heId of Array(this._che.halfEdgeCount).keys()) {
      if (!this._che.isValidHalfEdge(heId)) continue;
      vertex_1 = this._che.getHalfEdgeVertex(heId)
      vertex_2 = this._che.getHalfEdgeVertex(this._che.nextHalfEdge(heId))
      if (vertex_1 <= vertex_2) {
        verticesPairKey = `${vertex_1},${vertex_2}`
      } else {
        verticesPairKey = `${vertex_2},${vertex_1}`
      }

      let adjacent = adjacency[verticesPairKey]
      if (adjacent != null) {
        this.setOpposite(heId, adjacent);
        this.setOpposite(this._tableOpposite[heId], heId);
        delete adjacency[verticesPairKey]
      } else {
        adjacency[verticesPairKey] = heId
      }
    }
  }

  setOpposite(heId, oppositeHeId) {
    this._tableOpposite[heId] = oppositeHeId
  }

  // computeConnected() {
  //     if (this._che.halfEdgeCount == 0 && this._che.vertexCount == 0) {
  //         return null
  //     }

  //     this._tableConnected = new Array(this._che.triangleCount).fill(-1)

  //     for (let vertexId = 0; vertexId < this._che.triangleCount; vertexId++) {
  //         this.setConnected(vertexId, vertexId);
  //     }
  // }

  // setConnected(vertex_1, vertex_2) {
  //     this._tableConnected[vertex_1] = vertex_2
  // }


  relation00(vertexId) {
    // Computes the vertices in the star of a given vertex.
    if (!this._che.isValidVertex(vertexId)) {
      throw Error(`Vertex Star ERROR: Invalid vertex id: ${vertexId}`)
    }
    const vertices = new Set()
    let halfEdge = 0;

    //Gets the first incident half--edge
    for (let heId = 0; heId < this._che.halfEdgeCount; heId++) {
      if (vertexId == this._che.getHalfEdgeVertex(heId)) {
        halfEdge = heId;
        break;
      }
    }

    let halfEdgeAux = halfEdge;
    let hasOppositeHalfEdge = true;


    do {
      let nextHalfEdgeVertex = this._che.getHalfEdgeVertex(this._che.nextHalfEdge(halfEdge))
      if (nextHalfEdgeVertex != vertexId) {
        vertices.add(nextHalfEdgeVertex);
      }
      hasOppositeHalfEdge = this.getOppositeHalfEdge(halfEdge) != -1

      halfEdge = this._che.nextHalfEdge(this.getOppositeHalfEdge(halfEdge));

    } while (hasOppositeHalfEdge & (halfEdge != halfEdgeAux))
    let previousHasOpposite = false;

    if (halfEdge != halfEdgeAux) {
      halfEdge = halfEdgeAux;
      do {
        let previousHalfEdge = this._che.previousHalfEdge(halfEdge)
        let previousHalfEdgeVector = this._che.getHalfEdgeVertex(previousHalfEdge)
        if (previousHalfEdgeVector != vertexId) {
          vertices.add(previousHalfEdgeVector);
        }
        halfEdge = this.getOppositeHalfEdge(previousHalfEdge)
        previousHasOpposite = halfEdge != -1;
      } while (previousHasOpposite);
    }
    return [...vertices];
  }
  relation02(vertexId) {
    // Computes the vertices in the star of a given vertex.
    const triangles = new Set()
    let halfEdge = 0;

    //Gets the first incident half--edge
    for (let heId = 0; heId < this._che.halfEdgeCount; heId++) {
      if (vertexId == this._che.getHalfEdgeVertex(heId)) {
        halfEdge = heId;
        break;
      }
    }

    let halfEdgeAux = halfEdge;
    let hasOppositeHalfEdge = true;


    do {

      triangles.add(this._che.triangle(halfEdge));

      hasOppositeHalfEdge = this.getOppositeHalfEdge(halfEdge) != -1

      halfEdge = this._che.nextHalfEdge(this.getOppositeHalfEdge(halfEdge));

    } while (hasOppositeHalfEdge & (halfEdge != halfEdgeAux))
    let previousHasOpposite = false;

    if (halfEdge != halfEdgeAux) {
      halfEdge = halfEdgeAux;
      do {
        let previousHalfEdge = this._che.previousHalfEdge(halfEdge)
        let previousHalfEdgeVector = this._che.getHalfEdgeVertex(previousHalfEdge)

        triangles.add(this._che.triangle(halfEdge));
        halfEdge = this.getOppositeHalfEdge(previousHalfEdge)
        previousHasOpposite = halfEdge != -1;
      } while (previousHasOpposite);
    }
    return [...triangles];
  }


  relation10(halfEdgeId) {
    //Computes the vertices in the star of a given edge
    if (
      !this._che.isValidHalfEdge(halfEdgeId) ||
      !this._che.isValidHalfEdge(this._che.nextHalfEdge(halfEdgeId))
    ) {
      throw Error(`Edge Star ERROR: Invalid edge id: ${halfEdgeId}`)
    }
    const vertices = new Set();

    vertices.add(
      this._che.getHalfEdgeVertex(
        this._che.previousHalfEdge(halfEdgeId)
      )
    )
    vertices.add(
      this._che.getHalfEdgeVertex(
        this._che.previousHalfEdge(
          this.getOppositeHalfEdge(halfEdgeId)
        )
      )
    )

    return [...vertices]

  }

  relation12(halfEdgeId) {
    //Computes the vertices in the star of a given edge
    if (
      !this._che.isValidHalfEdge(halfEdgeId) ||
      !this._che.isValidHalfEdge(this._che.nextHalfEdge(halfEdgeId))
    ) {
      throw Error(`Edge Star ERROR: Invalid edge id: ${halfEdgeId}`)
    }
    const triangles = new Set();

    triangles.add(this._che.triangle(halfEdgeId))
    triangles.add(
      this._che.triangle(
        this.getOppositeHalfEdge(halfEdgeId)
      )
    )

    return [...triangles]

  }
  relation22(triangleId) {

    //Computes the triangle incidents of a given triangle
    if (!this._che.isValidTriangle(triangleId)) {
      throw Error(`Triangle Star ERROR: Invalid Triangle id: ${triangleId}`)
    }

    const triangles = new Set()

    triangles.add(this._che.triangle(this.getOppositeHalfEdge(3 * triangleId)))
    triangles.add(this._che.triangle(this.getOppositeHalfEdge(3 * triangleId + 1)))
    triangles.add(this._che.triangle(this.getOppositeHalfEdge(3 * triangleId + 2)))


    return [...triangles]
  }
}


module.exports = CheL1