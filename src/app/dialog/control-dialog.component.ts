import { Component } from '@angular/core';

@Component({
    selector: 'app-control-dialog',
    template: `
        <h1 mat-dialog-title>Control</h1>
        <div mat-dialog-content>
            <app-game-control></app-game-control>
        </div>
    `,
    styles: [],
})
export class ControlDialogComponent {}
