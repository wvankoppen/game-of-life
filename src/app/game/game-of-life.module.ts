import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlModule } from '../control/control.module';
import { GameOfLifeComponent } from '../game-of-life.component';
import { RendererModule } from '../renderer/renderer.module';
import { TitleComponent } from '../title/title.component';

@NgModule({
    declarations: [GameOfLifeComponent, TitleComponent],
    imports: [CommonModule, ControlModule, RendererModule],
    exports: [GameOfLifeComponent],
})
export class GameOfLifeModule {}
