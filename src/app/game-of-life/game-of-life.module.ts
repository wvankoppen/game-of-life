import { NgModule } from '@angular/core';
import { GameOfLifeRenderComponent } from './game-of-life-render.component';
import { CommonModule } from "@angular/common";
import { GameOfLifeComponent } from './game-of-life.component';
import { ControlModule } from "./control/control.module";

@NgModule({
    declarations: [GameOfLifeRenderComponent, GameOfLifeComponent],
  imports: [CommonModule, ControlModule],
  exports: [GameOfLifeRenderComponent, GameOfLifeComponent],
})
export class GameOfLifeModule {}
