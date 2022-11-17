import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
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
    PipesModule,
    MatDialogModule,
    DialogModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
  ],
    exports: [ControlComponent, StatsComponent, ControlComponent],
})
export class ControlModule {}
