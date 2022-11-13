import { Component, OnInit } from '@angular/core';
import { GameOfLifeService } from '../game-of-life.service';

@Component({
    selector: 'app-control',
    template: `
      <div class="game-of-life__control">
<!--        <button mat-button *ngIf="gameOfLifeService.hasLife" (click)="gameOfLifeService.reset()">-->
<!--          Clear-->
<!--        </button>-->
        <button
          mat-button
          (click)="gameOfLifeService.evolve()"
          color="primary"
                  [disabled]="gameOfLifeService.isStarted"
        >
          Tick
          <!--          [disabled]="gameOfLifeService.isStarted || !gameOfLifeService.hasLife"-->
        </button>
        <button mat-button (click)="gameOfLifeService.start()" *ngIf="!gameOfLifeService.isStarted">Start</button>
        <button mat-button (click)="gameOfLifeService.stop()" *ngIf="gameOfLifeService.isStarted">Stop</button>

<!--        Granularity:-->
<!--        <mat-slider-->
<!--          [min]="sizeMin"-->
<!--          [max]="sizeMax"-->
<!--          step="1"-->
<!--          [(ngModel)]="gameOfLifeService.cellSize"-->
<!--        ></mat-slider>-->
        Speed:
        <mat-slider
          [min]="speedMin"
          [max]="speedMax"
          step="1"
          [(ngModel)]="gameOfLifeService.speed"
        ></mat-slider>
<!--        Iterations: {{ gameOfLifeService.iterations }}-->
<!--        <mat-form-field>-->
<!--          <mat-select [(ngModel)]="nextFigure">-->
<!--            <mat-option-->
<!--              *ngFor="let figure of availableFigures"-->
<!--              [value]="figure"-->
<!--            >-->
<!--              <pre>{{ figure }}</pre>-->
<!--            </mat-option>-->
<!--          </mat-select>-->
<!--        </mat-form-field>-->
<!--        [{{ gameOfLifeService.rows }},{{ gameOfLifeService.cols }}],-->
      </div>`,
    styles: [
        `
            .game-of-life__control {
                z-index: 1;
                position: absolute;
            }
        `,
    ],
})
export class ControlComponent implements OnInit {

  speedMin = 1;
  speedMax = 100;
  sizeMin = 5;
  sizeMax = 10;
    constructor(public gameOfLifeService: GameOfLifeService) {

    }

    ngOnInit(): void {}
}
