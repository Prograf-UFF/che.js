/**
 * che.js - Compact Half Edge data structure in JavaScript
 *
 * @author Marcos Lage <mlage@ic.uff.br>
 *
 * Federal Fluminense University
 * Computer Science Institute
 * Prograf Lab. (http://prograf.ic.uff.br)
 */

import { CheL0 } from "./cheL0.js.js";
import { CheL1 } from "./cheL1.js.js";

export class Che {
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

    loadCheL1() {
        // previous level must be available
        if (this._level0 === null) { return; }
        // loads level 1
        this._level1 = new CheL1(this._level0);
    }

    cleanCheL1() {
        this._level1 = null;
    }
}
