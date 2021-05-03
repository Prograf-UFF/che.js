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

 class CheL2 {
    constructor(che) {
        this._nComponent;

        this._tableEdgeMap = [];
        this._tableVertexHalfEdge = [];

        this._che = che;

        this.computeEdgeMap();
        this.computeVertexHalfEdge();
    }

    getEdgeHalfEdge(heId){
      let oppositeHeId = this._che.getOppositeHalfEdge(heId)
      let chosenHalfEdge = this.chooseHalfEdge([heId, oppositeHeId])
      return this._tableEdgeMap.indexOf(chosenHalfEdge)
    }
    computeEdgeMap(){
      this._tableEdgeMap = []
      
      for(let heId = 0; heId < this._che.halfEdgeCount; heId++){
        if (!this._che.isValidHalfEdge(heId)){
          continue;
        }
        this._che.getHalfEdgeVertex(heId)
        let oppositeHeId = this._che.getOppositeHalfEdge(heId)
        let chosenHalfEdge = this.chooseHalfEdge([heId, oppositeHeId])
        if (this.getEdgeHalfEdge(chosenHalfEdge) == -1){
          this._tableEdgeMap.push(chosenHalfEdge)
        }
      }

    }

    getVertexHalfEdge(vertexId){
      return this._tableVertexHalfEdge[vertexId];
    }

    computeVertexHalfEdge(){
      this._tableVertexHalfEdge = new Array(this._che.vertexCount).fill(-1)
      
      for(let heId = 0; heId < this._che.halfEdgeCount; heId++){
        let heIdvertex = this._che.getHalfEdgeVertex(heId)
        if (this._che.getOppositeHalfEdge(heId) == -1){
          this._tableVertexHalfEdge[heIdvertex] = heId
        }
        else if (this.getVertexHalfEdge(heIdvertex) == -1){
          this._tableVertexHalfEdge[heIdvertex] = heId
        }
      }

    }

    chooseHalfEdge(halfEdgeList){
      let filteredList = halfEdgeList.filter( heId => {return heId > -1})
      return Math.min(...filteredList)
    }

    relation00(vertexId){
      const vertices = new Set()
      let halfEdge = this.getVertexHalfEdge(vertexId);
      let halfEdgeAux = halfEdge
      let hasOppositeHalfEdge = true;
      
      do {
          let nextHalfEdgeVertex = this._che.getHalfEdgeVertex(this._che.nextHalfEdge(halfEdge))
          if (nextHalfEdgeVertex != vertexId){
              vertices.add(nextHalfEdgeVertex);
          }
          hasOppositeHalfEdge = this._che.getOppositeHalfEdge(halfEdge) != -1
          
          halfEdge = this._che.nextHalfEdge(this._che.getOppositeHalfEdge(halfEdge));
          
      } while(hasOppositeHalfEdge & (halfEdge != halfEdgeAux))
      let previousHasOpposite = false;
      
      if (halfEdge != halfEdgeAux){
          halfEdge = halfEdgeAux;
          do{
              let previousHalfEdge = this._che.previousHalfEdge(halfEdge) 
              let previousHalfEdgeVector = this._che.getHalfEdgeVertex(previousHalfEdge)      
              if (previousHalfEdgeVector != vertexId){
                  vertices.add(previousHalfEdgeVector);
              }
              halfEdge = this._che.getOppositeHalfEdge(previousHalfEdge)
              previousHasOpposite = halfEdge != -1;
          } while(previousHasOpposite);
      }
      return [...vertices]

    }
}


module.exports = CheL2