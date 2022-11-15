import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { GameOfLifeService } from '../game/game-of-life.service';
import { figures, World } from '../model/game-of-life.model';

@Component({
    selector: 'app-game-control',
    template: ` <div class="game-of-life__control">

        <button
            mat-button
            title="Clear"
            *ngIf="evolution$ | async | hasLife"
            (click)="gameOfLifeService.reset()"
        >
          <i class="material-icons">clear</i>
        </button>
        <button
            mat-button
            (click)="gameOfLifeService.evolve()"
            title="Tick"
            color="primary"
            [disabled]="
                gameOfLifeService.isStarted || !(evolution$ | async | hasLife)
            "
        >
          <i class="material-icons">redo</i>
        </button>
        <button
            mat-button
            title="start"
            (click)="gameOfLifeService.start()"
            *ngIf="!gameOfLifeService.isStarted"
        >
          <i class="material-icons">play_arrow</i>
        </button>
        <button
            mat-button
            title="stop"
            (click)="gameOfLifeService.stop()"
            *ngIf="gameOfLifeService.isStarted"
        >
          <i class="material-icons">stop</i>
        </button>

      <i class="material-icons">photo_size_select_small</i>
        <mat-slider
            [min]="sizeMin"
            [max]="sizeMax"
            step="1"
            (valueChange)="onSizeChange($event)"
        ></mat-slider>

        <mat-label>
      <i class="material-icons">speed</i>
        </mat-label>
        <mat-slider
            [min]="speedMin"
            [max]="speedMax"
            thumbLabel
            step="1"
            [(ngModel)]="gameOfLifeService.speed"
        ></mat-slider>

      <i class="material-icons">redo</i> {{ evolution$ | async | iterations }}
        <button (click)="draw()" mat-button>Draw</button>
        Dimensions:
        <span *ngIf="evolution$ | async | dimensions as dims"
            >[{{ dims.rows }},{{ dims.cols }}]</span
        >
        Lives: {{ evolution$ | async | livingCellCount }}
    </div>`,
    styles: [``],
})
export class ControlComponent implements OnInit {
    speedMin = 1;
    speedMax = 100;
    sizeMin = 5;
    sizeMax = 10;

    @Output()
    cellSize = new EventEmitter<number>();

    constructor(
        public gameOfLifeService: GameOfLifeService,
        public dialog: MatDialog
    ) {}

    set brush(brushName: string) {
        this.gameOfLifeService.brush = figures[brushName];
    }

    get evolution$(): Observable<World> {
        return this.gameOfLifeService.evolution$;
    }

    ngOnInit(): void {
        this.brush = 'pulsar';
    }

    onSizeChange($event: number | null) {
        this.cellSize.emit($event ?? this.sizeMax);
    }

    draw() {
        this.dialog.open(DialogComponent);
    }
}
