import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ControlDialogModule } from './dialog/control-dialog.module';

@Component({
    selector: 'app-game-of-life',
    template: `
        <app-title></app-title>
        <app-game-renderer [cellSize]="cellSize"></app-game-renderer>
        <app-game-control></app-game-control>
        <app-game-stats></app-game-stats>
        <button (click)="openPopup()" mat-mini-fab color="primary">
            <mat-icon>menu</mat-icon>
        </button>
    `,
    styles: [
        `
            :host {
                display: block;
                height: 100%;
                margin: 0;
                padding: 0;
            }

            button {
                position: fixed;
                right: 10px;
                bottom: 10px;
            }
        `,
    ],
})
export class GameOfLifeComponent {
    constructor(public dialog: MatDialog) {}
    cellSize = 20;

    openPopup() {
        this.dialog.open(ControlDialogModule.bootstrap);
    }
}
