import { BoardService } from './../../../shared/board.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-col',
  templateUrl: './col.component.html',
  styleUrls: ['./col.component.css']
})
export class ColComponent implements OnInit {
  @Input() colPos = [];
  cellText: string = "Empty Cell";
  constructor(private BoardService: BoardService) { }

  ngOnInit() {

  }
  onCellClicked(): void {
    const cellStatus = this.BoardService.setQueenPosition({ row: this.colPos[0], col: this.colPos[1] });
    switch (cellStatus) {
      case null:
        this.cellText = "Empty Cell";
        break;
      case false:
        this.cellText = "Dead!";
        break;
      case true:
        this.cellText = "Queen!";
        break;
    }

  }

}
