import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild, } from '@angular/core';
import { debounceTime, Observable, tap } from 'rxjs';
import { runInZone } from '../util/run-in-zone';
import { observeElementSize } from '../util/resize-observer';
import { GameOfLifeService, isAlive } from './game-of-life.service';

const aliveColor = '#fce114';
const deadColor = '#a9a89f';

@Component({
    selector: 'app-game-of-life-render',
    template: ` <canvas (click)="onClick($event)" #canvasElement></canvas
        ><span>Size:{{ size$ | async | json }}</span>`,
    styles: [
        `
            @import '../../../node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css';
            :host {
                display: block;
                height: 100%;
            }
            canvas {
                width: calc(100% - 100px);
                height: calc(100% - 100px);
                position: absolute;
                background: #ccc;
                top: 20px;
                left: 20px;
              border: 1px solid #666;
                z-index: 0;
            }
            span {
              position: absolute;
              top:30px;
              left:300px;
            }
        `,
    ],
})
export class GameOfLifeRenderComponent implements OnInit, AfterViewInit {
    @ViewChild('canvasElement')
    canvasElement: ElementRef<HTMLCanvasElement> | undefined;

    context: CanvasRenderingContext2D | null | undefined;

    size$?: Observable<any>;
    private _cellSize: number = 10;

    constructor(
        private host: ElementRef,
        private zone: NgZone,
        private gameOfLife: GameOfLifeService
    ) {}

    ngOnInit() {
        this.gameOfLife.evolution.subscribe((e) =>
            this.draw(e.cells, e.iteration)
        );
    }

    resize(observerEntry: ResizeObserverEntry) {
        this.canvasElement!.nativeElement.width = window.innerWidth;
        this.canvasElement!.nativeElement.height = window.innerHeight;

        this.gameOfLife.resize(
            Math.ceil(observerEntry.contentRect.height / this.cellSize),
            Math.ceil(observerEntry.contentRect.width / this.cellSize)
        );
    }

    ngAfterViewInit() {
        this.initCanvas();
        this.observeCanvas();
    }

    private initCanvas() {
        this.context = this.canvasElement?.nativeElement.getContext('2d');
    }

    onClick($event: MouseEvent) {

        const rect = this.canvasElement!.nativeElement.getBoundingClientRect();
        const col = Math.floor(($event.x - rect.x) / this.cellSize);
        const row = Math.floor(($event.y - rect.y) / this.cellSize);
      console.log('click',{row,col});
        this.gameOfLife.toggle({ col, row });
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
        for (let col = 0; col < cells[0].length; col++) {
            for (let row = 0; row < cells.length; row++) {
                this.context!.fillStyle = isAlive(
                    {
                        col,
                        row,
                    },
                    cells
                )
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
            tap((v) => this.resize(v[0]))
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
