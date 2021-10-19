import { Component } from '@angular/core';
import { Type } from './game-of-life';
import { GameOfLifeService } from './game-of-life.service';

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
})
export class GameOfLifeControlComponent {
    types: Type[] = ['cell', 'spaceship-light'];
    set type(value: Type) {
        this.gameOfLifeService.creator = value;
    }

    constructor(private gameOfLifeService: GameOfLifeService) {}

    start() {
        this.gameOfLifeService.start();
    }

    stop() {
        this.gameOfLifeService.stop();
    }

    get isStarted(): boolean {
        return this.gameOfLifeService.isStarted;
    }

    nextGeneration() {
      this.gameOfLifeService.nextGeneration();
    }
}
