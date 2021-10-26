import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GameOfLifeModule } from './game-of-life/game-of-life.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule, GameOfLifeModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
