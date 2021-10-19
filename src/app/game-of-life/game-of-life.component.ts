import { Component } from '@angular/core';
import { GameOfLifeService } from './game-of-life.service';

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
    constructor(private gameOfLifeService: GameOfLifeService) {}

    onGolClick($event: any) {
        this.gameOfLifeService.create($event.col, $event.row);
    }
}
