/**
 * che.js - Compact Half Edge data structure in JavaScript
 *
 * @author Marcos Lage <mlage@ic.uff.br>
 *
 * Federal Fluminense University
 * Computer Science Institute
 * Prograf Lab. (http://prograf.ic.uff.br)
 */

export class Vertex {
    constructor(posX, posY, posZ, data = undefined) {
      this._posX = posX;
      this._posY = posY;
      this._posZ = posZ;
      this._data = data;
    }
  
    get posX() {
      return this._posX;
    }
    set posX(posX) {
      this._posX = posX;
    }
  
    get posY() {
      return this._posY;
    }
    set posY(posY) {
      this._posY = posY;
    }
  
    get posZ() {
      return this._posZ;
    }
    set posZ(posZ) {
      this._posZ = posZ;
    }
  
    get data() {
      return this._data;
    }
    set data(data) {
      this._data = data;
    }
  }
  