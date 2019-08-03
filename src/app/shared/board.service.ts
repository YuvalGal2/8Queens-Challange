import { Game } from './models/game.model';
import { Queen } from './models/queen.model';
import { Injectable } from '@angular/core';
@Injectable({
	providedIn: 'root'
})
export class BoardService {
	private numOfRowsAndCols: number;
	private queensPositions: number[][] = [];
	private queensOccipiedPositions: number[][] = [];
	private game = new Game();
	constructor() { }

	// single validation funciton
	validateQueenPosition(queenPosition: Queen["position"]) {
		let queenPlacementIsValid = true;
		const markedOccupiedPositions = [
			[queenPosition.row, queenPosition.col],
			...this.markDiagonalLineAbovePos(queenPosition),
			...this.markDiagonalLineBelowPos(queenPosition),
			...this.markLeftToRight(queenPosition),
			...this.markTopToBottom(queenPosition)
		];

		markedOccupiedPositions.forEach((markedPosition: number[]) => [
			this.getQueensPositions().forEach((queenPosition:number[]) => {
				if (markedPosition.toString() === queenPosition.toString()) {
					console.log(queenPosition);
					console.log(markedPosition);
					queenPlacementIsValid = false;
				}
			})
		])

		
		if (queenPlacementIsValid) {
			this.queensPositions.push([queenPosition.row, queenPosition.col]);
			this.queensOccipiedPositions.push(...markedOccupiedPositions);
		}

		return queenPlacementIsValid;
	}

	// use these funcitons as a blueprint to mark which areas the newly placed queen will block
	markDiagonalLineBelowPos(queenPosition: Queen["position"]) {
		const occupiedCells = []
		for (let row = queenPosition.row + 1, col = queenPosition.col; row <= this.numOfRowsAndCols; row++) {
			if (++col <= this.numOfRowsAndCols && row <= this.numOfRowsAndCols) {
				if (!this.isPositionExistsAlready(occupiedCells, [row, col])) {
					occupiedCells.push([row, col]);
				}
			}
		}
		for (let row = queenPosition.row + 1, col = queenPosition.col; row <= this.numOfRowsAndCols; row++) {
			if (--col > 0 && row <= this.numOfRowsAndCols) {
				if (!this.isPositionExistsAlready(occupiedCells, [row, col])) {
					occupiedCells.push([row, col]);
				}
			}
		}
		return occupiedCells;
	}

	markDiagonalLineAbovePos(queenPosition: Queen["position"]) {
		const occupiedCells = []
		for (let row = queenPosition.row - 1, col = queenPosition.col; row > 0; row--) {
			if (--col > 0 && row > 0) {
				if (!this.isPositionExistsAlready(occupiedCells, [row, col])) {
					occupiedCells.push([row, col]);
				}
			}
		}

		for (let row = queenPosition.row - 1, col = queenPosition.col; row > 0; row--) {
			if (++col > 0 && row > 0) {
				if (!this.isPositionExistsAlready(occupiedCells, [row, col])) {
					occupiedCells.push([row, col]);
				}
			}
		}
		return occupiedCells;
	}

	markTopToBottom(queenPosition: Queen["position"]) {
		const occupiedCells = [];
		for (let row = 1; row <= this.numOfRowsAndCols; row++) {
			if (row !== queenPosition.row) {
				occupiedCells.push([row, queenPosition.col])
			}
		}
		return occupiedCells;
	}

	markLeftToRight(queenPosition: Queen["position"]) {
		const occupiedCells = [];
		for (let col = 1; col <= this.numOfRowsAndCols; col++) {
			if (col !== queenPosition.col) {
				occupiedCells.push([queenPosition.row, col])
			}
		}
		return occupiedCells;
	}

	// utilities functions
	isPositionExistsAlready(checkInArray: number[], position: number[]): boolean {
		if (checkInArray.toString().includes(position.toString())) {
			return true;
		}
		else {
			return false;
		}
	}
	
	setQueenPosition(queenPosition: Queen["position"]) {

		// for starting, the cell is empty.
		let placedWell = null;
		let alreadyExists = false;

		// go over the queens position and look for already placed queen in that cell.
		this.queensPositions.forEach((queen) => {
			if(queen.toString() === [queenPosition.row,queenPosition.col].toString()){
				alreadyExists = true;
			}
		});

		// if there is no queen in that cell..
		if (!alreadyExists) {
			if ( this.validateQueenPosition(queenPosition)) {
					placedWell = true;
					if (this.getQueensPositions().length === 2) {
						this.game.setGameStatus({ over: true, result: 'win' });
					}
			}
			else {
				this.game.setGameStatus({ over: true, result: 'lose' });
				placedWell = false;;
			}
		}
		else { 
			// if there is, clean it.
			this.cleanCell(queenPosition);
		}
		return placedWell;
	}

	cleanCell(queenPosition){
		// Get all related occipied Positions by that cell.
		const markedOccupiedPositions = [
			[queenPosition.row, queenPosition.col],
			...this.markDiagonalLineAbovePos(queenPosition),
			...this.markDiagonalLineBelowPos(queenPosition),
			...this.markLeftToRight(queenPosition),
			...this.markTopToBottom(queenPosition)
		];

		// remove the queen from the queens list.
		const filterdQueensPositions = this.getQueensPositions()
		.filter((queenPos) => queenPos.toString() !== [queenPosition.row,queenPosition.col].toString());


		// remove all the occipied Positions one by one.
		this.queensPositions = filterdQueensPositions;
		for(let marked of markedOccupiedPositions) {
			this.getQueensOccipiedPositions().filter((occpiedPos,index) => {
				if(occpiedPos.toLocaleString() === marked.toString()) {
					this.queensOccipiedPositions.splice(index,1);
					return occpiedPos.toString() === marked.toString();
				}
			})
		}
	}
	getQueensPositions(): number[][] {
		return this.queensPositions;
	}

	getQueensOccipiedPositions(): number[][] {
		return this.queensOccipiedPositions;
	}

	restartGame(): void {
		this.game.setGameStatus({ over: false, result: null });
		this.queensOccipiedPositions = [];
		this.queensPositions = [];
	}


	setBoardSize(size: number = 8): void {
		this.numOfRowsAndCols = size;
	}

	getBoardSize(): number {
		return this.numOfRowsAndCols;
	}


}
