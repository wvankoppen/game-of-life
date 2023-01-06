import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { GameControlModule } from '../control/game-control.module';
import { ControlDialogComponent } from './control-dialog.component';

@NgModule({
    declarations: [ControlDialogComponent],
    imports: [CommonModule, MatDialogModule, GameControlModule],
})
export class ControlDialogModule {
    static bootstrap = ControlDialogComponent;
}
