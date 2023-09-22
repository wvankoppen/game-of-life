import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GameControlModule } from '../control/game-control.module';
import { TitleComponent } from '../title/title.component';
import {GameOfLifeComponent} from "./game-of-life.component";
import {RendererComponent} from "../renderer/renderer.component";

@NgModule({
    declarations: [GameOfLifeComponent],
    imports: [
        GameControlModule,
        RendererComponent,
        MatButtonModule,
        MatIconModule,
        TitleComponent,
    ],
    exports: [GameOfLifeComponent],
})
export class GameOfLifeModule {}
