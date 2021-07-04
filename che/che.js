/**
 * che.js - Compact Half Edge data structure in JavaScript
 *
 * @author Marcos Lage <mlage@ic.uff.br>
 *
 * Federal Fluminense University
 * Computer Science Institute
 * Prograf Lab. (http://prograf.ic.uff.br)
 */


require('@loaders.gl/polyfills');
const {
    fetchFile,
    parse
} = require('@loaders.gl/core');
const {
    PLYLoader
} = require('@loaders.gl/ply');
const chunk = require('./utils')

const Vertex = require("./vertex");
const CheL0 = require("./cheL0.js");
const CheL1 = require("./cheL1.js");
const CheL2 = require("./cheL2.js");
const CheL3 = require("./cheL3.js");

class Che {
    constructor() {
        this._filename = '';

        this._level0 = null;
        this._level1 = null;
        this._level2 = null;
        this._level3 = null;
    }

    get level0() {
        return this._level0;
    }
    get level1() {
        return this._level1;
    }
    get level2() {
        return this._level2;
    }
    get level3() {
        return this._level3;
    }

    loadCheL0(tableG, tableV) {
        // load level 0 using mesh data
        this._level0 = new CheL0(tableG, tableV);
        // clean the other levels
        this._level1 = null;
        this._level2 = null;
        this._level3 = null;
    }

    get vertexCount() {
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        return this._level0.vertexCount;
    }
    get triangleCount() {
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        return this._level0._nTriangle;
    }
    get halfEdgeCount() {
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        return this._level0.halfEdgeCount;
    }

    isValidVertex(vertexId) {
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        // returns False if invalid, else retursn the vertex
        return this._level0.isValidVertex(vertexId);
    }
    isValidHalfEdge(heId) {
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        // Checks if a half-edge is valid
        return this._level0.isValidHalfEdge(heId);
    }

    getVertex(vertexId) {
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        if (this.isValidVertex(vertexId)) {
            return this._tableGeometry[vertexId];
        }
        return null;
    }
    getHalfEdgeVertex(heId) {
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        return this._level0.getHalfEdgeVertex(heId);
    }

    setVertex(vertexId, geometry) {
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        this._level0.setVertex(vertexId, geometry);
    }
    setHalfEdgeVertex(heId, vertexId) {
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        this._level0.setHalfEdgeVertex(heId, vertexId);
    }

    triangle(heId) {
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        return this._level0.triangle(heId);
    }
    nextHalfEdge(heId) {
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        return this._level0.nextHalfEdge(heId);
    }
    previousHalfEdge(heId) {
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        return this._level0.previousHalfEdge(heId);
    }

    loadCheL1() {
        // previous level must be available
        if (this._level0 === null) {
            return;
        }
        // loads level 1
        this._level1 = new CheL1(this);
    }

    cleanCheL1() {
        this._level1 = null;
    }

    getOppositeHalfEdge(heId) {
        if (this._level1 === null) {
            throw Error("CHE Level 1 is not loaded.");
        }

        return this._level1.getOppositeHalfEdge(heId);
    }

    loadCheL2() {
        // previous levels must be available
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        if (this._level1 === null) {
            throw Error("CHE Level 1 is not loaded.");
        }
        // loads level 2
        this._level2 = new CheL2(this);
    }

    cleanCheL2() {
        this._level2 = null;
    }

    getEdgeHalfEdge(heId) {
        if (this._level2 === null) {
            throw Error("CHE Level 2 is not loaded.");
        }
        return this._level2.getEdgeHalfEdge(heId);
    }
    getVertexHalfEdge(vertexId) {
        if (this._level2 === null) {
            throw Error("CHE Level 2 is not loaded.");
        }
        return this._level2.getVertexHalfEdge(vertexId);
    }

    loadCheL3() {
        // previous levels must be available
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        if (this._level1 === null) {
            throw Error("CHE Level 1 is not loaded.");
        }
        if (this._level2 === null) {
            throw Error("CHE Level 2 is not loaded.");
        }
        // loads level 2
        this._level3 = new CheL3(this);
    }

    cleanCheL3() {
        this._level3 = null;
    }

    getCurveHalfEdge(vertexId) {
        if (this._level3 === null) {
            throw Error("CHE Level 3 is not loaded.");
        }
        return this._level3.getCurveHalfEdge(vertexId);
    }

    relation00(vertexId) {
        // Computes the vertices in the star of a given vertex
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        if (this._level2) {
            return this._level2.relation00(vertexId);
        }
        if (this._level1) {
            return this._level1.relation00(vertexId);
        } else {
            return this._level0.relation00(vertexId);
        }

    }

    relation02(vertexId) {

        // Computes the triangles of the star of a given vertex
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        if (!this._level0.isValidVertex(vertexId)) {
            throw Error(`Vertex Star ERROR: Invalid vertex id: ${vertexId}`)
        }
        if (this._level2) {
            return this._level2.relation02(vertexId);
        }
        if (this._level1) {
            return this._level1.relation02(vertexId);
        }
        return this._level0.relation02(vertexId);
    }

    relation10(halfEdgeId) {

        // Computes the vertices of the star of a given edge
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        if (this._level1) {
            return this._level1.relation10(halfEdgeId);
        }
        return this._level0.relation10(halfEdgeId);
    }

    relation12(halfEdgeId) {

        // Computes the vertices of the star of a given edge
        if (this._level0 === null) {
            throw Error("CHE Level 0 is not loaded.");
        }
        if (this._level1) {
            return this._level1.relation12(halfEdgeId);
        }
        return this._level0.relation12(halfEdgeId);
    }

    async loadPly(plyUrl) {
        let file = await fetchFile(plyUrl)
        let data = await parse(file.body, PLYLoader);
        let vertices_coordinates = chunk(data.attributes.POSITION.value, 3);
        let vertices = [];
        for (let coordinates of vertices_coordinates) {
            vertices.push(new Vertex(
                coordinates[0],
                coordinates[1],
                coordinates[2]
            ))
        }
        this.loadCheL0(
            vertices,
            data.indices.value);
    }
}

module.exports = Che