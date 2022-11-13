import { NgModule } from '@angular/core';
import { GameOfLifeComponent } from './game-of-life.component';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [GameOfLifeComponent],
    imports: [CommonModule],
    exports: [GameOfLifeComponent],
})
export class GameOfLifeModule {}
