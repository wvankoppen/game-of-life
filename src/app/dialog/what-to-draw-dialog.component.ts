import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { GameOfLifeService } from '../game/game-of-life.service';
import { figures } from '../model/game-of-life.model';

@Component({
    selector: 'app-what-to-draw-dialog',
    template: `
        <h1 mat-dialog-title>Choose what to draw</h1>
        <div mat-dialog-content>
            <button
                (click)="draw(figureType)"
                *ngFor="let figureType of figureTypes"
            >
                {{ figureType }}
            </button>
        </div>
    `,
    styles: [``],
})
export class WhatToDrawDialogComponent {
    figureTypes = Object.keys(figures);

    constructor(
        private gameOfLifeService: GameOfLifeService,
        private dialogRef: DialogRef
    ) {}

    draw(figureType: string) {
        this.gameOfLifeService.paintBrush = figures[figureType];
        this.dialogRef.close();
    }
}
