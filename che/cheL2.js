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

class CheL2 {
  constructor(che) {
    this._nComponent;

    this._EdgeMap = new Map();
    this._tableVertexHalfEdge = [];

    this._che = che;

    this.computeEdgeMap();
    this.computeVertexHalfEdge();
  }

  makePair(halfEdgeList) {
    // Makes a pair out of a list of two half-edges
    // Will always put the smaller valid half-edge index first
    halfEdgeList.sort(function (a, b) {
      return a - b;
    });
    if (halfEdgeList[0] == -1) {
      halfEdgeList[0] = halfEdgeList[1]
      halfEdgeList[1] = -1
    }
  }

  getEdgeHalfEdge(heId) {
    let oppositeHeId = this._che.getOppositeHalfEdge(heId)
    let pair = [heId, oppositeHeId]
    this.makePair(pair)
    if (this._EdgeMap.get(pair[0])) {

      return [pair[0], this._EdgeMap.get(pair[0])]
    }
    return -1
  }
  computeEdgeMap() {
    this._EdgeMap = new Map()
    // this._tableEdgeMap = []

    for (let heId = 0; heId < this._che.halfEdgeCount; heId++) {
      if (!this._che.isValidHalfEdge(heId)) {
        continue;
      }
      this._che.getHalfEdgeVertex(heId)
      let oppositeHeId = this._che.getOppositeHalfEdge(heId)
      let pair = [heId, oppositeHeId]
      this.makePair(pair)

      if (![...this._EdgeMap.keys()].includes(pair[0])) {
        this._EdgeMap.set(pair[0], pair[1])
      }
    }

  }

  getVertexHalfEdge(vertexId) {
    return this._tableVertexHalfEdge[vertexId];
  }

  computeVertexHalfEdge() {
    this._tableVertexHalfEdge = new Array(this._che.vertexCount).fill(-1)

    for (let heId = 0; heId < this._che.halfEdgeCount; heId++) {
      let heIdvertex = this._che.getHalfEdgeVertex(heId)
      if (this._che.getOppositeHalfEdge(heId) == -1) {
        this._tableVertexHalfEdge[heIdvertex] = heId
      } else if (this.getVertexHalfEdge(heIdvertex) == -1) {
        this._tableVertexHalfEdge[heIdvertex] = heId
      }
    }
  }


  relation00(vertexId) {
    // Computes the vertices in the star of a given vertex.
    if (!this._che.isValidVertex(vertexId)) {
      throw Error(`Vertex Star ERROR: Invalid vertex id: ${vertexId}`)
    }
    const vertices = new Set()
    let halfEdge = this.getVertexHalfEdge(vertexId);
    let halfEdgeAux = halfEdge
    let hasOppositeHalfEdge = true;

    do {
      let nextHalfEdgeVertex = this._che.getHalfEdgeVertex(this._che.nextHalfEdge(halfEdge))
      if (nextHalfEdgeVertex != vertexId) {
        vertices.add(nextHalfEdgeVertex);
      }
      hasOppositeHalfEdge = this._che.getOppositeHalfEdge(halfEdge) != -1

      halfEdge = this._che.nextHalfEdge(this._che.getOppositeHalfEdge(halfEdge));

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
        halfEdge = this._che.getOppositeHalfEdge(previousHalfEdge)
        previousHasOpposite = halfEdge != -1;
      } while (previousHasOpposite);
    }
    return [...vertices]

  }

  relation02(vertexId) {
    // Computes the vertices in the star of a given vertex.
    const triangles = new Set()
    let halfEdge = this.getVertexHalfEdge(vertexId);
    let halfEdgeAux = halfEdge
    let hasOppositeHalfEdge = true;


    do {

      triangles.add(this._che.triangle(halfEdge));

      hasOppositeHalfEdge = this._che.getOppositeHalfEdge(halfEdge) != -1

      halfEdge = this._che.nextHalfEdge(this._che.getOppositeHalfEdge(halfEdge));

    } while (hasOppositeHalfEdge & (halfEdge != halfEdgeAux))
    let previousHasOpposite = false;

    if (halfEdge != halfEdgeAux) {
      halfEdge = halfEdgeAux;
      do {
        let previousHalfEdge = this._che.previousHalfEdge(halfEdge)
        let previousHalfEdgeVector = this._che.getHalfEdgeVertex(previousHalfEdge)

        triangles.add(this._che.triangle(halfEdge));
        halfEdge = this._che.getOppositeHalfEdge(previousHalfEdge)
        previousHasOpposite = halfEdge != -1;
      } while (previousHasOpposite);
    }
    return [...triangles];
  }

  checkVertexfHalfEdgeTable() {
    return this._che.vertexCount == this._tableVertexHalfEdge.length
  }

  checkValidVertexHalfEdge() {
    //Checks if all vertex half edges are valid values
    for (let i = 0; i < this._che.vertexCount; i++) {
      if (this.getVertexHalfEdge(i) >= 3 * this._che.triangleCount) {
        return false;
      }
      if (this.getVertexHalfEdge(i) < 0) {
        return false;
      }
    }

    return true
  }

  checkEdgeHalfEdge() {
    //Checks if all vertex half edges are valid values
    for (let i = 0; i < this._tableEdgeMap.length; i++) {

      if (this.getVertexHalfEdge(i) < 0) {
        return false;
      }
    }

    return true
  }

}


module.exports = CheL2