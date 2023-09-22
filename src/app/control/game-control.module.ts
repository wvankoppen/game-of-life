import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { WhatToDrawDialogModule } from '../dialog/what-to-draw-dialog.module';
import { GameControlComponent } from './game-control.component';
import { GameStatsComponent } from './game-stats.component';
import { DimensionsPipe } from '../pipes/dimensions.pipe';
import { IterationsPipe } from '../pipes/iterations.pipe';
import { LivingCellCountPipe } from '../pipes/living-cell-count.pipe';
import { HasLifePipe } from '../pipes/has-life.pipe';
import { AsyncPipe, DecimalPipe } from '@angular/common';

@NgModule({
    declarations: [GameControlComponent, GameStatsComponent],
    imports: [
        MatSliderModule,
        MatButtonModule,
        MatDialogModule,
        WhatToDrawDialogModule,
        MatIconModule,
        MatCheckboxModule,
        MatDividerModule,
        MatSlideToggleModule,
        DimensionsPipe,
        IterationsPipe,
        LivingCellCountPipe,
        HasLifePipe,
        FormsModule,
        AsyncPipe,
        DecimalPipe,
    ],
    exports: [GameControlComponent, GameStatsComponent],
})
export class GameControlModule {}
