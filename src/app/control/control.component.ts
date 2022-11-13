import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { GameOfLifeService } from '../game/game-of-life.service';
import { World } from '../model/game-of-life.model';

@Component({
    selector: 'app-game-control',
    template: ` <div class="game-of-life__control">
        <button
            mat-button
            *ngIf="evolution$ | async | hasLife"
            (click)="gameOfLifeService.reset()"
        >
            Clear
        </button>
        <button
            mat-button
            (click)="gameOfLifeService.evolve()"
            color="primary"
            [disabled]="
                gameOfLifeService.isStarted || !(evolution$ | async | hasLife)
            "
        >
            Tick
        </button>
        <button
            mat-button
            (click)="gameOfLifeService.start()"
            *ngIf="!gameOfLifeService.isStarted"
        >
            Start
        </button>
        <button
            mat-button
            (click)="gameOfLifeService.stop()"
            *ngIf="gameOfLifeService.isStarted"
        >
            Stop
        </button>

        Granularity:
        <mat-slider
            [min]="sizeMin"
            [max]="sizeMax"
            step="1"
            (valueChange)="onSizeChange($event)"
        ></mat-slider>
        Speed:
        <mat-slider
            [min]="speedMin"
            [max]="speedMax"
            step="1"
            [(ngModel)]="gameOfLifeService.speed"
        ></mat-slider>
        Iterations: {{ evolution$ | async | iterations }}
        <!--                <mat-form-field>-->
        <!--                  <mat-select [(ngModel)]="nextFigure">-->
        <!--                    <mat-option-->
        <!--                      *ngFor="let figure of availableFigures"-->
        <!--                      [value]="figure"-->
        <!--                    >-->
        <!--                      <pre>{{ figure }}</pre>-->
        <!--                    </mat-option>-->
        <!--                  </mat-select>-->
        <!--                </mat-form-field>-->
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

    get evolution$(): Observable<World> {
        return this.gameOfLifeService.evolution$;
    }

    constructor(public gameOfLifeService: GameOfLifeService) {}

    ngOnInit(): void {}

    onSizeChange($event: number | null) {
        this.cellSize.emit($event ?? this.sizeMax);
    }
}
