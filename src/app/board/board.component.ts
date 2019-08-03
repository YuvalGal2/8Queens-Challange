import { Component, OnInit } from '@angular/core';
import { BoardService } from '../shared/board.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  constructor(private BoardService: BoardService) { }
  boardRows: number[] = [];
  ngOnInit() {
    this.initalizedRows();
    this.BoardService.gameStatus.subscribe((gamestatus) => {
      if (gamestatus.over === true) {
        switch (gamestatus.result) {
          case "win":
            alert("Good Job, you have won!")
            break;
          case "lose":
            alert("Sorry, You have lost.. try again later!")
            this.BoardService.restartGame();
            this.initalizedRows();
            break;
        }
      }
    })
  }

  initalizedRows(){
    this.boardRows = this.populateRowsArray(new Array(this.BoardService.setBoardSize(8)));
  }
  populateRowsArray(emptyArray:number[]){
    return emptyArray.fill(null).map((slot, index) => ++index);
  }
}

