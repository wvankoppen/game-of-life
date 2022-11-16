import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { GameOfLifeService } from '../game/game-of-life.service';
import { figures, World } from '../model/game-of-life.model';

@Component({
    selector: 'app-game-control',
    template: `
        <button
            mat-button
            title="start"
            (click)="gameOfLifeService.start()"
            *ngIf="!gameOfLifeService.isStarted"
        >
            <i class="material-icons">play_arrow</i> run
        </button>
        <button
            mat-button
            title="stop"
            (click)="gameOfLifeService.stop()"
            *ngIf="gameOfLifeService.isStarted"
        >
            <i class="material-icons">stop</i> stop
        </button>

        <button
            mat-button
            (click)="gameOfLifeService.evolve()"
            title="Tick"
            [disabled]="
                gameOfLifeService.isStarted || !(evolution$ | async | hasLife)
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
        <mat-slider
            [min]="sizeMin"
            [max]="sizeMax"
            thumbLabel
            step="1"
            value="20"
            (valueChange)="onSizeChange($event)"
        ></mat-slider>

        <i class="material-icons">speed</i>speed
        <mat-slider
            [min]="speedMin"
            [max]="speedMax"
            thumbLabel
            step="1"
            [(ngModel)]="gameOfLifeService.speed"
        ></mat-slider>
    `,
    styles: [
        `
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
        `,
    ],
})
export class ControlComponent implements OnInit {
    speedMin = 1;
    speedMax = 100;
    sizeMin = 5;
    sizeMax = 20;

    @Output()
    cellSize = new EventEmitter<number>();

    constructor(
        public gameOfLifeService: GameOfLifeService,
        public dialog: MatDialog
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

    onSizeChange($event: number | null) {
        this.cellSize.emit($event ?? this.sizeMax);
    }

    draw() {
        this.dialog.open(DialogComponent);
    }
}
