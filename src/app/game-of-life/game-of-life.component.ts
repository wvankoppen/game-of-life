import { AfterViewInit, Component, ElementRef, NgZone, ViewChild, } from '@angular/core';
import { debounceTime, Observable, tap } from 'rxjs';
import { runInZone } from '../util/run-in-zone';
import { observeElementSize } from '../util/resize-observer';
import { GameOfLifeService } from './game-of-life.service';

const aliveColor = '#fce114';
const deadColor = '#a9a89f';

@Component({
    selector: 'app-game-of-life',
    template: ` <canvas (click)="onClick($event)" #canvasElement></canvas>`,
    styles: [
        `
            @import '../../../node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css';
            :host {
                display: block;
                height: 100%;
            }
            canvas {
                width: 100%;
                height: 100%;
                position: absolute;
                background: #ccc;
                top: 0;
                left: 0;
                z-index: 0;
            }
        `,
    ],
})
export class GameOfLifeComponent implements AfterViewInit {
    @ViewChild('canvasElement')
    canvasElement: ElementRef<HTMLCanvasElement> | undefined;

    context: CanvasRenderingContext2D | null | undefined;

    size$?: Observable<any>;
  private _cellSize: number = 10;

    constructor(
        private host: ElementRef,
        private zone: NgZone,
        private gameOfLife: GameOfLifeService
    ) {

    }

    ngOnInit() {
      this.gameOfLife.evolution.subscribe(e => this.draw(e.cells, e.iteration));
    }

    resize() {
        this.canvasElement!.nativeElement.width = window.innerWidth;
        this.canvasElement!.nativeElement.height = window.innerHeight;
    }

    ngAfterViewInit() {
        this.initCanvas();
        this.observeCanvas();
    }

    private initCanvas() {
        this.context = this.canvasElement?.nativeElement.getContext('2d');
    }

    onClick($event: MouseEvent) {
        // const rect = this.canvasElement!.nativeElement.getBoundingClientRect();
        // const col = Math.round(($event.x - rect.x) / this.gameOfLife.cellSize);
        // const row = Math.round(($event.y - rect.y) / this.gameOfLife.cellSize);
        //
        // this.gameOfLife.click({ col, row });
    }

    draw(cells: boolean[][], iteration: number) {
        if (!this.context) {
            return;
        }
        this.context!.clearRect(
            0,
            0,
            cells.length * this.cellSize,
            cells[0].length * this.cellSize
        );
        for (let col = 0; col < cells[0].length ; col++) {
            for (let row = 0; row < cells.length ; row++) {
                this.context!.fillStyle = this.gameOfLife.isAlive({
                    col,
                    row,
                })
                    ? aliveColor
                    : deadColor;
                this.context!.fillRect(
                    col * this.cellSize,
                    row * this.cellSize,
                    this.cellSize - 1,
                    this.cellSize - 1
                );
            }
        }
    }

    private observeCanvas() {
        this.size$ = observeElementSize(this.host.nativeElement).pipe(
            debounceTime(100),
            runInZone(this.zone),
            tap((_) => this.resize())
        );
    }

  get cellSize(): number {
    return this._cellSize;
  }

  set cellSize(value: number) {
    this._cellSize = value;
    // this.fitWorld();
  }
}
