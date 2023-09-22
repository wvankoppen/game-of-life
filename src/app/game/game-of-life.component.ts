import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

const controlDialogModule = import('../dialog/control-dialog.module').then(
    (m) => m.ControlDialogModule
);

@Component({
    selector: 'app-game-of-life',
    template: `
        <app-title />

        <app-game-renderer />

        <app-game-control />
        <app-game-control />

        <app-game-stats />

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

            @media (max-width: 849px) {
                button {
                    position: fixed;
                    right: 10px;
                    bottom: 10px;
                }
                app-game-control {
                    display: none;
                }
            }

            @media (min-width: 850px) {
                button {
                    display: none;
                }
                app-game-control {
                    opacity: 0.5;
                    border: 1px solid #000;
                    position: fixed;
                    bottom: 20px;
                    left: 20px;
                    background: #ccc;
                    display: inline-flex;
                    align-items: center;
                }
            }
        `,
    ],
})
export class GameOfLifeComponent {
    constructor(public dialog: MatDialog) {}

    async openPopup() {
        this.dialog.open((await controlDialogModule).bootstrap);
    }
}
