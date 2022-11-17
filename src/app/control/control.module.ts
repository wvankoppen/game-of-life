import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { DialogModule } from '../dialog/dialog.module';
import { PipesModule } from '../pipes/pipes.module';
import { ControlComponent } from './control.component';
import { StatsComponent } from './stats.component';

@NgModule({
    declarations: [ControlComponent, StatsComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatSliderModule,
        MatButtonModule,
        MatSelectModule,
        PipesModule,
        MatDialogModule,
        DialogModule,
        MatIconModule,
    ],
    exports: [ControlComponent, StatsComponent, ControlComponent],
})
export class ControlModule {}
