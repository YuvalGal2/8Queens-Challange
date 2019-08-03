import { BoardService } from './../../../shared/board.service';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-col',
  templateUrl: './col.component.html',
  styleUrls: ['./col.component.css']
})
export class ColComponent implements OnInit {
  @Input() colPos = [];
  constructor(private BoardService:BoardService) { }

  ngOnInit() {
    
  }
  onCellClicked():void {
    this.BoardService.setQueenPosition([this.colPos[0],this.colPos[1]])
  }

}
