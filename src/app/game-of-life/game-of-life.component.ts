import { Component } from '@angular/core';
import { GameOfLifeService } from './game-of-life.service';

@Component({
    selector: 'app-game-of-life',
    template: `<app-game-of-life-control></app-game-of-life-control>
    <hr/>
        <app-game-of-life-world
            (golClick)="onGolClick($event)"
        ></app-game-of-life-world>`,
})
export class GameOfLifeComponent {
    constructor(private gameOfLifeService: GameOfLifeService) {}

    onGolClick($event: any) {
        this.gameOfLifeService.createFigure($event.col, $event.row);
    }
}
