import { Queen } from './models/queen.model';
import { Injectable } from '@angular/core';
import { isFulfilled } from 'q';
@Injectable({
	providedIn: 'root'
})
export class BoardService {
	private numOfRowsAndCols;
	private gameStatus = false;
	private queensPositions: Queen["position"][] = [];


	constructor() { }


	checkDiagonalLineLtr(queenPosition: Queen["position"]):any {
		return false;
	}
	checkDiagonalLineRtl(queenPosition: Queen["position"]):any {
		return false;
	}
	checkTopToBottom(queenPosition: Queen["position"]):any {
		return false;
	}
	checkLeftToRight(queenPosition: Queen["position"]):any {
		return false;
	}
	
	validateQueenPosition(queenPosition: Queen["position"]): boolean {
		const forbiddenCells = [];
		console.log(`clicked on: `);
		console.log(queenPosition);
		console.log('-----');
		// TODO:
		// * the condition: if cell isnt in the array 
		// * after condition is passed.

		// TODO: 
		//forbiddenCells.push([++row,col]) -- if the condition is passed.

		//  foreach queen placed,
		// go from top left  -> one col bottom right

		for (let row = queenPosition.row, col = queenPosition.col + 1; col <= this.numOfRowsAndCols; col++) {
			forbiddenCells.push([++row, col,'diagonal line left to right'])
		}


		// go from top right  -> one col bottom left
		if (queenPosition.col - 1 > 0 && queenPosition.row - 1 > 0) {
			for (let row = queenPosition.row, col = queenPosition.col - 1; col > 0; col--) {
				if (--row > 0 && col > 0) {
					forbiddenCells.push([row, col,'diagonal line right to to left'])
				}

			}
		}

		// go from left to right
		for (let col = 1; col <= this.numOfRowsAndCols; col++) {
			if (col !== queenPosition.col) {
				forbiddenCells.push([queenPosition.row, col,'left to right'])
			}
		}

		// go from top to bottom
		for (let row = 1; row <= this.numOfRowsAndCols; row++) {
			if (row !== queenPosition.row) {
				forbiddenCells.push([row, queenPosition.col,'top to bottom'])
			}
		}
		console.log(forbiddenCells);

		// and map the forbiddan places. 
		// then match it with the global forbiddan places array with the map opreator.
		// if there is no match, meaning there won't be a problem placing a queen there.


		// pass the forbiddan array to the global one and push the queen.
		// very important to also pass on the the global forbiddan the location of the newly 
		// placed queen.

		// update the view
		// return false is queen is killed.

		// console.log(forbiddenCells);

		// TODO: 
		// move logic to spearte function set and create simple if statement here.
		return false;

	}

setQueenPosition(queenPosition: Queen['position']): void {
	this.queensPositions.push(queenPosition);
	this.validateQueenPosition(queenPosition);
}

getGameStatus(): boolean {
	return this.gameStatus;
}

setGameStatus(newGameStatus: boolean): boolean {
	return this.gameStatus = newGameStatus;
}

setBoardSize(size: number = 8): void {
	this.numOfRowsAndCols = size;
}

getBoardSize(): number {
	return this.numOfRowsAndCols;
}
}
