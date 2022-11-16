import { Component } from '@angular/core';

@Component({
    selector: 'app-game-of-life',
    template: `
        <app-title></app-title>
        <app-game-renderer [cellSize]="cellSize"></app-game-renderer>
        <app-game-control
            (cellSize)="onCellSizeChange($event)"
        ></app-game-control>
        <app-game-stats></app-game-stats>
    `,
    styles: [
        `
            :host {
                display: block;
                height: 100%;
                margin: 0;
                padding: 0;
            }
        `,
    ],
})
export class GameOfLifeComponent {
    cellSize = 20;

    onCellSizeChange($event: number) {
        this.cellSize = $event;
        console.log('onCellSizeChange', $event);
    }
}
