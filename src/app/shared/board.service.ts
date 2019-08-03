import { Queen } from './models/queen.model';
import { Injectable } from '@angular/core';
@Injectable({
	providedIn: 'root'
})
export class BoardService {
	private numOfRowsAndCols;
	private gameStatus = false;
	private queensPositions = [];
	private queensOccipiedPositions = [];

	// * VERY IMPORTANT!!!!!!!
	// * USE THE MODEL OF THE Queen to set and set the position of the queens.

	constructor() { }

	validateQueenPosition(queenPosition) {

		const markedOccupiedPositions = [
			[queenPosition.row,queenPosition.col],
			...this.markDiagonalLineLtr(queenPosition),
			...this.markDiagonalLineRtl(queenPosition),
			...this.markLeftToRight(queenPosition),
			...this.markTopToBottom(queenPosition)
		];
		
	
		const placementCauseThreat = markedOccupiedPositions.find((pos) => {
			return this.getqueensPositions().toString().includes(pos.toString());
		})
		if(placementCauseThreat) {
			//console.log("error!");
			return false;
		}
		else {
			console.log("Queen placed!");
			this.queensPositions.push([queenPosition.row,queenPosition.col]);
			this.queensOccipiedPositions.push(...markedOccupiedPositions);
			console.log(this.queensOccipiedPositions);
		}
		
	}



	setQueenPosition(queenPosition): void {
		const alreadyExists = this.getqueensPositions().toString().includes(queenPosition.toString());
		if (!alreadyExists) {
			console.log("New!");
			this.validateQueenPosition({ row: queenPosition[0], col: queenPosition[1] });
		}
	}





	// TODO : Change functions name to upper case.
	getqueensPositions() {
		return this.queensPositions;
	}

	getqueensOccipiedPositions() {
		return this.queensOccipiedPositions;
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


	markDiagonalLineLtr(queenPosition) {
		const occupiedCells = []
		// go from top left to bottom right -- starting from the point of click
		for (let row = queenPosition.row, col = queenPosition.col + 1; col <= this.numOfRowsAndCols; col++) {
			occupiedCells.push([++row, col])
		}
		return occupiedCells;
	}


	markDiagonalLineRtl(queenPosition) {
		const occupiedCells = [];
		// go from bottom right to top left -- 
		if (queenPosition.col - 1 > 0 && queenPosition.row - 1 > 0) {
			for (let row = queenPosition.row, col = queenPosition.col - 1; col > 0; col--) {
				if (--row > 0 && col > 0) {
					occupiedCells.push([row, col])
				}

			}
		}
		return occupiedCells;
	}


	markTopToBottom(queenPosition) {
		const occupiedCells = [];
		// go from top to bottom
		for (let row = 1; row <= this.numOfRowsAndCols; row++) {
			if (row !== queenPosition.row) {
				occupiedCells.push([row, queenPosition.col])
			}
		}
		return occupiedCells;
	}



	markLeftToRight(queenPosition) {
		const occupiedCells = [];
		// go from left to right
		for (let col = 1; col <= this.numOfRowsAndCols; col++) {
			if (col !== queenPosition.col) {
				occupiedCells.push([queenPosition.row, col])
			}
		}
		return occupiedCells;
	}
}
