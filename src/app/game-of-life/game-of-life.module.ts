import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameOfLifeComponent } from './game-of-life.component';

@NgModule({
    declarations: [GameOfLifeComponent],
    imports: [CommonModule, FormsModule],
    exports: [GameOfLifeComponent],
})
export class GameOfLifeModule {}
