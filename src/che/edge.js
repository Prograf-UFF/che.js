/**
 * Che.js - Compact Half Edge data structure in JavaScript
 *
 * @author Marcos Lage <mlage@ic.uff.br>
 *
 * Federal Fluminense University
 * Computer Science Institute
 * Prograf Lab. (http://prograf.ic.uff.br)
 *
 * Copyright (c) 2018 Marcos Lage
 */

export class Edge {
    constructor(start, final, data = undefined) {
        // Start vertex of the edge.
        this._start = start;
        // Final vertex of the edge.
        this._final = final;
        // Edge data
        this._data = data;
    }

    get first() {
        return this._first;
    }
    set first(first) {
        this._first = first;
    }

    get last() {
        return this._last;
    }
    set last(last) {
        this._last = last;
    }

    get data() {
        return this._data;
    }
    set data(data) {
        this._data = data;
    }
}
