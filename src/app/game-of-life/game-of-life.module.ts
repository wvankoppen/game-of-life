import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameOfLifeControlComponent } from './game-of-life-control.component';
import { GameOfLifeWorldComponent } from './game-of-life-world.component';
import { GameOfLifeComponent } from './game-of-life.component';
import { GolBoxPipe } from './gol-box.pipe';

@NgModule({
    declarations: [
        GameOfLifeWorldComponent,
        GameOfLifeControlComponent,
        GameOfLifeComponent,
        GolBoxPipe,
    ],
    imports: [CommonModule, FormsModule],
    exports: [
        GameOfLifeControlComponent,
        GameOfLifeWorldComponent,
        GameOfLifeComponent,
    ],
})
export class GameOfLifeModule {}
