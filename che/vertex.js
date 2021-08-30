/**
 * che.js - Compact Half Edge data structure in JavaScript
 *
 * @author Marcos Lage <mlage@ic.uff.br>
 *
 * Federal Fluminense University
 * Computer Science Institute
 * Prograf Lab. (http://prograf.ic.uff.br)
 */

export default class Vertex {
  constructor(posX, posY, posZ, nX = 0, nY = 0, nZ = 0, data = undefined) {
    //positions
    this._posX = posX;
    this._posY = posY;
    this._posZ = posZ;

    //normals
    this._nX = nX;
    this._nY = nY;
    this._nZ = nZ;


    //extra data
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

  get nX() {
    return this._nX;
  }
  set nX(nX) {
    this._nX = nX;
  }

  get nY() {
    return this._nY;
  }
  set nY(nY) {
    this._nY = nY;
  }

  get nZ() {
    return this._nZ;
  }
  set nZ(nZ) {
    this._nZ = nZ;
  }


  get data() {
    return this._data;
  }
  set data(data) {
    this._data = data;
  }

  static normal(v0, v1, v2) {
    let normal = [];
    let aux0 = [];
    let aux1 = [];
    normal[0] = 0;
    normal[1] = 0;
    normal[2] = 0;

    aux0[0] = v1.posX - v0.posX;
    aux0[1] = v1.posY - v0.posY;
    aux0[2] = v1.posZ - v0.posZ;

    aux1[0] = v2.posX - v0.posX;
    aux1[1] = v2.posY - v0.posY;
    aux1[2] = v2.posZ - v0.posZ;

    normal[0] = aux0[1] * aux1[2] - aux1[1] * aux0[2];
    normal[1] = aux0[2] * aux1[0] - aux1[2] * aux0[0];
    normal[2] = aux0[0] * aux1[1] - aux1[0] * aux0[1];
    return normal;
  }

  static normalize(v) {
    let squaredNorm = v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
    let norm = Math.sqrt(squaredNorm)
    v[0] /= norm
    v[1] /= norm
    v[2] /= norm

    return v
  }
}