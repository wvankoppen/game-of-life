import { Component } from '@angular/core';

@Component({
    selector: 'app-game-of-life',
    template: ` <app-game-control
            (cellSize)="onCellSizeChange($event)"
        ></app-game-control>
        <app-game-renderer></app-game-renderer>`,
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
    onCellSizeChange($event: number) {
        console.log('onCellSizeChange', $event);
    }
}
