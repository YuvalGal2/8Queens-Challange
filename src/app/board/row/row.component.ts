import { BoardService } from './../../shared/board.service';
import { Component, OnInit,Input} from '@angular/core';
@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {

  constructor(private boardService:BoardService) { }
  @Input() rowIndex;
  colsArray:number[] = [];

  ngOnInit() {
    // convert the number of columns we got from the service to array form,
    // and pass out the index,
    // which will be used in the fuature in the col component
    this.colsArray = Array(this.boardService.getBoardSize()).fill(null).map((col:any,index:number) => index + 1);
  }

}
