import { Component } from '@angular/core';
import { Type } from './game-of-life';

const cols = 80;
const rows = 60;

@Component({
    selector: 'app-root',
    template: `
        <button (click)="nextGeneration()">Tick</button>
        <button (click)="start()" [disabled]="isStarted">Start</button>
        <button (click)="stop()" [disabled]="!isStarted">Stop</button>
        <select [(ngModel)]="type">
            <option *ngFor="let type of types" [value]="type">
                {{ type }}
            </option>
        </select>
        <app-game-of-life (golClick)="onGolClick($event)"> </app-game-of-life>
    `,
})
export class AppComponent {
    types: Type[] = ['cell', 'spaceship-light'];
    type: Type = 'cell';

    public interval: any;

    get isStarted(): boolean {
        return !!this.interval;
    }

    start() {
        this.interval = setInterval(() => this.nextGeneration(), 10);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    nextGeneration() {}

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
