import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveComponentModule } from '@ngrx/component'

import { AppComponent } from './app.component';
import { GameOfLifeModule } from './game-of-life/game-of-life.module'

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule,ReactiveComponentModule, GameOfLifeModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
