/**
 * cheL0.js - Compact Half Edge data structure in JavaScript
 *
 * @author João Gabriel Moutella <jmoutella@id.uff.br>
 *
 * Federal Fluminense University
 * Computer Science Institute
 * Prograf Lab. (http://prograf.ic.uff.br)
 */

export default class CheL1 {
  constructor(che) {
    this._nComponent;

    this._tableOpposite = [];
    this._tableConnected = [];
    this._nCompounds = 0
    this._che = che;
    this.computeOpposite();
    this.orient();
    this.computeConnected();
  }

  getOppositeHalfEdge(heId) {
    if (this._che.isValidHalfEdge(heId)) {
      return this._tableOpposite[heId]
    }
  }

  setNBound(nCompounds) {
    this._nCompounds = nCompounds
  }

  get compoundCount() {
    return this._nCompounds;
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


  orient() {
    if (this._che.vertexCount == 0 && this._che.level0._tableGeometry.length) {
      return
    }

    let stack = []
    let visited = new Array(this._che.triangleCount).fill(false)

    stack.push(0)
    stack.push(1)
    stack.push(2)

    visited[0] = true;

    while (stack.length) {
      let halfEdge = stack.pop()

      // Avoid null edges
      let oppositeHalfEdge = this.getOppositeHalfEdge(halfEdge)
      if (oppositeHalfEdge == -1) {
        continue;
      }

      // Avoid loop
      let triangle = this._che.triangle(oppositeHalfEdge)
      if (visited[triangle]) {
        continue;
      }

      if (!this.orient_check(halfEdge, oppositeHalfEdge)) {
        this.orient_change(triangle)
      }

      visited[triangle] = true;
      stack.push(3 * triangle);
      stack.push(3 * triangle + 1);
      stack.push(3 * triangle + 2);
    }
  }

  orient_change(triangleId) {
    let halfEdgeOne = 3 * triangleId;
    let halfEdgeTwo = 3 * triangleId + 1;
    let halfEdgeThree = 3 * triangleId + 2;

    //change geometrical vertices
    let vertexIdOne = this._che.getHalfEdgeVertex(halfEdgeOne);
    let vertexIdTwo = this._che.getHalfEdgeVertex(halfEdgeTwo)
    this._che.level0.setHalfEdgeVertex(halfEdgeOne, vertexIdTwo)
    this._che.level0.setHalfEdgeVertex(halfEdgeTwo, vertexIdOne)

    //inverted remaining half edges
    let oppositeHalfEdgeTwo = this.getOppositeHalfEdge(halfEdgeTwo)
    let oppositeHalfEdgeThree = this.getOppositeHalfEdge(halfEdgeThree)

    this.setOpposite(halfEdgeTwo, oppositeHalfEdgeThree)
    this.setOpposite(halfEdgeThree, oppositeHalfEdgeTwo)
    this.setOpposite(oppositeHalfEdgeTwo, halfEdgeThree)
    this.setOpposite(oppositeHalfEdgeThree, halfEdgeTwo)
  }

  orient_check(halfEdge, oppositeHalfEdge) {

    let v1, v2, v3, v4;

    v1 = this._che.getHalfEdgeVertex(halfEdge);
    v2 = this._che.getHalfEdgeVertex(this._che.nextHalfEdge(halfEdge));

    v3 = this._che.getHalfEdgeVertex(oppositeHalfEdge);
    v4 = this._che.getHalfEdgeVertex(this._che.nextHalfEdge(oppositeHalfEdge));

    return (v1 == v4 && v2 == v3);

  }

  computeConnected() {
    if (this._che.halfEdgeCount == 0 && this._che.vertexCount == 0) {
      return null
    }

    this._tableConnected = new Array(this._che.vertexCount).fill(-1)
    for (let vertexId = 0; vertexId < this._che.vertexCount; vertexId++) {
      this.setConnected(vertexId, vertexId);
    }
    for (let triangleId = 0; triangleId <= this._che.triangleCount; triangleId++) {
      if (!this._che.isValidTriangle(triangleId)) {
        continue;
      }

      let b0 = this.getComponent(this._che.getHalfEdgeVertex(3 * triangleId));
      let b1 = this.getComponent(this._che.getHalfEdgeVertex(3 * triangleId + 1));
      let b2 = this.getComponent(this._che.getHalfEdgeVertex(3 * triangleId + 2));
      if (b0 < 0 || b1 < 0 || b2 < 0) {
        continue;
      }
      if (b0 < b1) {
        if (b0 < b2) {
          /** b0 min*/
          this.setConnected(b1, b0);
          this.setConnected(b2, b0);
        } else {
          /** b2 min*/
          this.setConnected(b0, b2);
          this.setConnected(b1, b2);
        }
      } else {
        if (b1 < b2) {
          /** b1 min*/
          this.setConnected(b0, b1);
          this.setConnected(b2, b1);
        } else {
          /** b2 min*/
          this.setConnected(b0, b2);
          this.setConnected(b1, b2);
        }
      }
    }
    this.setNBound(0);
    const m = new Map();
    let iterator = null;
    for (let vertexId = 0; vertexId < this._che.vertexCount; vertexId++) {
      if (!this._che.isValidVertex(vertexId)) {
        continue;
      }
      let b = this.getComponent(vertexId)
      // console.log(`${vertexId}: ${b}`)
      if (b < 0) {
        continue;
      }
      iterator = m.get(b)
      if (isNaN(iterator)) {
        m.set(b, this._nCompounds++)
      }
    }

    for (let vertexId = 0; vertexId < this._che.vertexCount; vertexId++) {
      if (!this._che.isValidVertex(vertexId)) {
        continue;
      }
      let b = this.getCompound(vertexId)

      if (b < 0) {
        continue;
      }
      this.setConnected(vertexId, m.get(b))
    }

    //cout << " " << ncomp() << " connected compound(s) found." << endl;
    //console.log(`${this.compoundCount} connected compound(s) found`)
  }

  getCompound(vertexId) {
    if (this._che.isValidVertex(vertexId)) {
      return this._tableConnected[vertexId]
    }
    return null;
  }

  getComponent(compoundId) {
    let b = this.getCompound(compoundId)
    //console.log(`compoundId ${compoundId}, b ${b}`)
    if (b < 0 || b == compoundId) {
      return b
    }
    b = this.getComponent(b)
    //console.log(`compoundId ${compoundId}, b ${b}`)
    this.setConnected(compoundId, b)

    return b
  }

  setConnected(vertex_1, vertex_2) {
    if (vertex_1 >= 0 && vertex_1 < this._che.vertexCount)
      this._tableConnected[vertex_1] = vertex_2
  }

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
        halfEdgeId
      )
    )
    vertices.add(
      this._che.getHalfEdgeVertex(
        this._che.getOppositeHalfEdge(halfEdgeId)
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

    triangles.delete(null);
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

    triangles.delete(null);
    return [...triangles]
  }


  checkOppositeTableSize() {
    //CHE_L1:: Erro 3*ntrig()!= O.size
    return 3 * this._che.triangleCount == this._tableOpposite.length
  }

  checkConnectedTableSize() {
    return this._che.vertexCount == this._tableConnected.length
  }

  checkOpposites() {
    for (let i = 0; i < 3 * this._che.triangleCount; i++) {
      if (this.getOppositeHalfEdge(i) >= 0 &&
        this.getOppositeHalfEdge(this.getOppositeHalfEdge(i)) != i) {
        return false;
      }
    }
    return true;
  }
  checkOrientation() {
    for (let i = 0; i < 3 * this._che.triangleCount; i++) {
      if (this.getOppositeHalfEdge(i) >= 0 &&
        !this.orient_check(i, this.getOppositeHalfEdge(i)))
        return false;
    }
    return true;
  }
}