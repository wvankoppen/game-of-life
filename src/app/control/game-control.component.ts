import { Component, Host, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { WhatToDrawDialogComponent } from "../dialog/what-to-draw-dialog.component";
import { GameOfLifeComponent } from '../game-of-life.component';
import { GameOfLifeService } from '../game/game-of-life.service';
import { figures, World } from '../model/game-of-life.model';

@Component({
    selector: 'app-game-control',
    template: `
        <mat-slide-toggle
            title="active"
            (change)="
                gameOfLifeService.isRunning = !gameOfLifeService.isRunning
            "
            [checked]="gameOfLifeService.isRunning"
            ><span>active</span>
        </mat-slide-toggle>

        <button
            mat-button
            (click)="gameOfLifeService.evolve()"
            title="Tick"
            [disabled]="
                gameOfLifeService.isRunning || !(evolution$ | async | hasLife)
            "
        >
            <i class="material-icons">redo</i> tick
        </button>

        <button
            mat-button
            title="Clear"
            [disabled]="!(evolution$ | async | hasLife)"
            (click)="gameOfLifeService.reset()"
        >
            <i class="material-icons">clear</i>clear
        </button>

        <button (click)="draw()" title="Paint" mat-button>
            <i class="material-icons">format_paint</i> draw
        </button>

        <i class="material-icons">photo_size_select_small</i>cell size
        <mat-slider [min]="sizeMin" [max]="sizeMax" discrete step="1">
            <input matSliderThumb [(ngModel)]="parent.cellSize" />
        </mat-slider>

        <i class="material-icons">speed</i>speed
        <mat-slider [min]="speedMin" [max]="speedMax" discrete step="1">
            <input matSliderThumb [(ngModel)]="gameOfLifeService.speed" />
        </mat-slider>
    `,
    styles: [
        `
            * {
                color: #333 !important;
            }

            :host {
                opacity: 0.5;
                border: 1px solid #000;
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: #ccc;
                display: inline-flex;
                align-items: center;
            }

            i:not(:first-child) {
                margin: 0 5px 0 30px;
                padding: 0;
            }

            mat-slider,
            mat-slide-toggle {
                margin: 0 20px 0;
            }

            span {
                color: black;
            }
        `,
    ],
})
export class GameControlComponent implements OnInit {
    speedMin = 1;
    speedMax = 100;
    sizeMin = 2;
    sizeMax = 20;

    constructor(
        public gameOfLifeService: GameOfLifeService,
        public dialog: MatDialog,
        @Host() public parent: GameOfLifeComponent
    ) {}

    set paintBrush(brushName: string) {
        this.gameOfLifeService.paintBrush = figures[brushName];
    }

    get evolution$(): Observable<World> {
        return this.gameOfLifeService.evolution$;
    }

    ngOnInit(): void {
        this.paintBrush = 'cell';
    }

    draw() {
        this.dialog.open(WhatToDrawDialogComponent);
    }
}
