export class CheL0 {
    constructor(tableG, tableV) {
        this._nVertex = tableG.length;
        this._nTriagle = tableV.length / 3;

        this._tableG = tableG;
        this._tableV = tableV;
    }
}
