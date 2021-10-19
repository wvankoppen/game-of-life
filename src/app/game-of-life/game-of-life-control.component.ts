import { Component, EventEmitter, Output } from '@angular/core';
import { Type } from '../game-of-life';

@Component({
    selector: 'app-game-of-life-control',
    template: ` <button (click)="nextGeneration()">Tick</button>
        <button (click)="start()" [disabled]="isStarted">Start</button>
        <button (click)="stop()" [disabled]="!isStarted">Stop</button>
        <select [(ngModel)]="type">
            <option *ngFor="let type of types" [value]="type">
                {{ type }}
            </option>
        </select>`,
    styleUrls: ['./game-of-life-control.component.css'],
})
export class GameOfLifeControlComponent  {
    @Output() start = new EventEmitter();
    @Output() stop = new EventEmitter();
    @Output() next = new EventEmitter();

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
}
