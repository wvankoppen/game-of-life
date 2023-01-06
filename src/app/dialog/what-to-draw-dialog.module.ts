import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { WhatToDrawDialogComponent } from './what-to-draw-dialog.component';

@NgModule({
    declarations: [WhatToDrawDialogComponent],
    imports: [CommonModule, MatDialogModule],
})
export class WhatToDrawDialogModule {}
