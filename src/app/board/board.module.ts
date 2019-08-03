import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { RowComponent } from './row/row.component';
import { ColComponent } from './row/col/col.component';



@NgModule({
  declarations: [
    BoardComponent,
    RowComponent,
    ColComponent
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    BoardComponent,
    RowComponent,
    ColComponent
  ]
})
export class BoardModule { }
