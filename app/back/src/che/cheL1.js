export class CheL1 {
  constructor(level0) {
    this._level0 = level0;

    this._nComponent;

    this._tableO = [];
    this._tableC = [];
  }

  isValidHalfEdge(heId) {
    return this._level0.isValidHalfEdge(heId) && this._tableO[heId] != null;
  }
}
