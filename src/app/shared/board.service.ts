import { Queen } from './models/queen.model';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private numOfRowsAndCols;
  private gameStatus = false;
  private queensPositions:Queen["position"][] = [];


  constructor() { }
  
  validateQueenPosition(queenPosition:Queen["position"]):boolean {
    const forbiddenCells = [];

    // TODO: 

      //  foreach queen placed,
      // go from top left  -> one col bottom right
          let row = queenPosition.row;
          for(let col = queenPosition.col+1 ; col <= this.numOfRowsAndCols;col++) {
            forbiddenCells.push([++row,col])
          }
        



      // go from top right  -> one col bottom left

      // go from left to right

      // go from top to bottom

      // and map the forbiddan places. 
      // then match it with the global forbiddan places array with the map opreator.
      // if there is no match, meaning there won't be a problem placing a queen there.


      // pass the forbiddan array to the global one and push the queen.
      // very important to also pass on the the global forbiddan the location of the newly 
      // placed queen.

      // update the view
      // return false is queen is killed.
    
   // console.log(forbiddenCells);
    return false;
  } 

  setQueenPosition(queenPosition:Queen['position']):void { 
    this.queensPositions.push(queenPosition);
    this.validateQueenPosition(queenPosition);
  }

  getGameStatus():boolean {
    return this.gameStatus;
  }

  setGameStatus(newGameStatus:boolean):boolean { 
    return this.gameStatus = newGameStatus;
  }
  
  setBoardSize(size:number = 8):void {
    this.numOfRowsAndCols = size;
  }
  
  getBoardSize():number { 
    return this.numOfRowsAndCols;
  }
}
