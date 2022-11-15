import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { GameOfLifeService } from '../game/game-of-life.service';
import { figures } from '../model/game-of-life.model';

@Component({
    selector: 'app-dialog',
    template: `
        <button
            (click)="draw(figureType)"
            *ngFor="let figureType of figureTypes"
        >
            {{ figureType }}
        </button>
    `,
    styles: [``],
})
export class DialogComponent {
    figureTypes = Object.keys(figures);
    constructor(
        private gameOfLifeService: GameOfLifeService,
        private dialogRef: DialogRef
    ) {}

    draw(figureType: string) {
        this.gameOfLifeService.brush = figures[figureType];
        this.dialogRef.close();
    }
}
