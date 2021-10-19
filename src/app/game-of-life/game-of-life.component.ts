import { Component } from '@angular/core';

const cols = 80;
const rows = 60;

@Component({
    selector: 'app-game-of-life',
    template: `<app-game-of-life-control></app-game-of-life-control>
        <app-game-of-life-world
            (golClick)="onGolClick($event)"
        ></app-game-of-life-world>`,
})
export class GameOfLifeComponent {
    onGolClick($event: any) {
        // if (this.type === 'cell') {
        //     createCell(this.world, $event.col, $event.row);
        // }
        // if (this.type === 'spaceship-light') {
        //     createSpaceShip(this.world, $event.col, $event.row);
        // }
        //
        // this.draw();
    }
}
