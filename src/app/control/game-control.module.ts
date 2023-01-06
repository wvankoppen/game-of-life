import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { WhatToDrawDialogModule } from '../dialog/what-to-draw-dialog.module';
import { PipesModule } from '../pipes/pipes.module';
import { GameControlComponent } from './game-control.component';
import { GameStatsComponent } from './game-stats.component';

@NgModule({
    declarations: [GameControlComponent, GameStatsComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatSliderModule,
        MatButtonModule,
        PipesModule,
        MatDialogModule,
        WhatToDrawDialogModule,
        MatIconModule,
        MatCheckboxModule,
        MatDividerModule,
        MatSlideToggleModule,
    ],
    exports: [GameControlComponent, GameStatsComponent],
})
export class GameControlModule {}
