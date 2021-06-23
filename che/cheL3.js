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

class CheL3 {
  constructor(che) {
    this._nCurves = 0;

    this._tableCurveHalfEdge = [];
    this._che = che;
    this.computeCurveHalfEdge();
  }

  getCurveHalfEdge(vertexId) {
    return this._tableVertexHalfEdge[vertexId];
  }

  computeCurveHalfEdge() {
    let visited = new Array(this._che.halfEdgeCount).fill(false);

    for (let heId = 0; heId < this._che.halfEdgeCount; heId++) {
      if (this._che.getOppositeHalfEdge(heId) == -1 && !visited[heId]) {
        this._tableCurveHalfEdge.push(heId);
        this._nCurves++
        let heIdVisited = heId;
        do {

          visited[heIdVisited] = true;
          while (this._che.getOppositeHalfEdge(this._che.nextHalfEdge(heIdVisited)) >= 0) {
            heIdVisited = this._che.getOppositeHalfEdge(this._che.nextHalfEdge(heIdVisited))
          }
          heIdVisited = this._che.nextHalfEdge(heIdVisited)
        }
        while (heId != heIdVisited)
        break
      }
    }

  }
}


module.exports = CheL3