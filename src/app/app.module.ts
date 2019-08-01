import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { RowComponent } from './board/row/row.component';
import { ColComponent } from './board/row/col/col.component';
import { QueenComponent } from './board/row/col/queen/queen.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    RowComponent,
    ColComponent,
    QueenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
