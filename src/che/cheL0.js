export class CheL0 {
    constructor(verts, trigs) {
        this._nVertex = verts.length;
        this._nTriagle = trigs.length / 3;

        this._tableG = verts;
        this._tableV = trigs;
    }
}