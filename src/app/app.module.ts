import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveComponentModule } from '@ngrx/component'

import { AppComponent } from './app.component';
import { GameOfLifeComponent } from './game-of-life/game-of-life.component';

@NgModule({
    declarations: [AppComponent, GameOfLifeComponent],
    imports: [BrowserModule, FormsModule,ReactiveComponentModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
