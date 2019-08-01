import { Component, OnInit } from '@angular/core';
import { BoardService } from '../shared/board.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  constructor(private BoardService:BoardService) { }
  rows = [1,2,3,4,5,6,7,8];
  ngOnInit() {
    this.BoardService.setBoardSize(this.rows.length);
  }

}
