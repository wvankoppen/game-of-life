import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameOfLifeComponent } from './game-of-life.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [GameOfLifeComponent],
    imports: [CommonModule, FormsModule, MatSliderModule, MatButtonModule],
    exports: [GameOfLifeComponent],
})
export class GameOfLifeModule {}
