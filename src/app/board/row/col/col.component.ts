import { BoardService } from './../../../shared/board.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-col',
  templateUrl: './col.component.html',
  styleUrls: ['./col.component.css']
})
export class ColComponent implements OnInit {
  @Input() colPos = [];
  cellStatus:any;
  constructor(private BoardService: BoardService) { }

  ngOnInit() {
    this.BoardService.gameRestarted.subscribe(() => this.cellStatus = null )
  }
  onCellClicked():void {
    this.cellStatus = this.BoardService.setQueenPosition({ row: this.colPos[0], col: this.colPos[1] });
  }

}
