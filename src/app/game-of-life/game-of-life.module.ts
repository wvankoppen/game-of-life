import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameOfLifeControlComponent } from './game-of-life-control.component';
import { GameOfLifeWorldComponent } from './game-of-life-world.component';
import { GameOfLifeComponent } from './game-of-life.component';

@NgModule({
    declarations: [GameOfLifeWorldComponent, GameOfLifeControlComponent, GameOfLifeComponent],
    imports: [CommonModule],
  exports : [GameOfLifeControlComponent, GameOfLifeWorldComponent, GameOfLifeComponent],
})
export class GameOfLifeModule {}
