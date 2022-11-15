import { Component } from '@angular/core';

@Component({
    selector: 'app-game-of-life',
    template: `
        <app-title></app-title>
        <app-game-renderer [cellSize]="cellSize"></app-game-renderer>
        <app-game-control
            (cellSize)="onCellSizeChange($event)"
        ></app-game-control>
    `,
    styles: [
        `
            :host {
                display: block;
                height: 100%;
            }

            app-game-control {
                position: absolute;
                bottom: 0;
            }
        `,
    ],
})
export class GameOfLifeComponent {
    cellSize = 10;

    onCellSizeChange($event: number) {
        this.cellSize = $event;
        console.log('onCellSizeChange', $event);
    }
}
