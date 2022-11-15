import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DialogModule } from '../dialog/dialog.module';
import { PipesModule } from '../pipes/pipes.module';
import { ControlComponent } from './control.component';

@NgModule({
    declarations: [ControlComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatSliderModule,
        MatButtonModule,
        MatSelectModule,
        PipesModule,
        MatDialogModule,
        DialogModule,
    ],
    exports: [ControlComponent],
})
export class ControlModule {}
