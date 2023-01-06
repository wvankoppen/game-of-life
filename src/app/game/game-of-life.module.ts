import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GameControlModule } from '../control/game-control.module';
import { GameOfLifeComponent } from '../game-of-life.component';
import { RendererModule } from '../renderer/renderer.module';
import { TitleComponent } from '../title/title.component';

@NgModule({
    declarations: [GameOfLifeComponent, TitleComponent],
    imports: [
        CommonModule,
        GameControlModule,
        RendererModule,
        MatButtonModule,
        MatIconModule,
    ],
    exports: [GameOfLifeComponent],
})
export class GameOfLifeModule {}
