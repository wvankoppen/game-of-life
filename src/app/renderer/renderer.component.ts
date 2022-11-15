import {
    AfterViewInit,
    Component,
    ElementRef,
    NgZone,
    OnInit,
    ViewChild,
} from '@angular/core';
import { debounceTime, tap } from 'rxjs';
import { isAlive } from '../game/logic';
import { runInZone } from '../util/run-in-zone';
import { observeElementSize } from '../util/resize-observer';
import { GameOfLifeService } from '../game/game-of-life.service';

const aliveColor = '#fce114';
const deadColor = '#a9a89f';

const aliveColor2 = '#fce1a4';
const deadColor2 = '#afa8ff';


@Component({
    selector: 'app-game-renderer',
    template: ` <canvas (click)="onClick($event)" #canvasElement></canvas>`,
    styles: [
        `
            @import '../../../node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css';
            :host {
                display: block;
                height: 100%;
                padding: 10px;
            }
            canvas {
                width: 100%;
                height: 100%;
                background: #ccc;
                border: 1px solid #666;
                z-index: 0;
            }
            span {
                position: absolute;
                top: 30px;
                left: 300px;
            }
        `,
    ],
})
export class RendererComponent implements OnInit, AfterViewInit {
    @ViewChild('canvasElement')
    canvasElement: ElementRef<HTMLCanvasElement> | undefined;

    context: CanvasRenderingContext2D | null | undefined;

    private _cellSize: number = 10;

    constructor(
        private host: ElementRef,
        private zone: NgZone,
        private gameOfLife: GameOfLifeService
    ) {}

    ngOnInit() {
        this.gameOfLife.evolution$.subscribe((e) =>
            this.draw(e.cells)
        );
    }

    resize(observerEntry: ResizeObserverEntry) {
        this.canvasElement!.nativeElement.width =
            observerEntry.contentRect.width;
        this.canvasElement!.nativeElement.height =
            observerEntry.contentRect.height;

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
        console.log('click', { row, col });
        this.gameOfLife.paint({ col, row });
    }

    draw(cells: boolean[][]) {
        console.log('draw');
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
              const targetColor = isAlive(
                {
                  col,
                  row,
                },
                cells
              )
                ? col % 10 === 0||row % 10 === 0  ? aliveColor2: aliveColor
                : col % 10 === 0||row % 10 === 0  ? deadColor2: deadColor;
                this.context!.fillStyle = targetColor;
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
        observeElementSize(this.canvasElement!.nativeElement)
            .pipe(
                debounceTime(100),
                runInZone(this.zone),
                tap((v) => this.resize(v[0]))
            )
            .subscribe();
    }

    get cellSize(): number {
        return this._cellSize;
    }

    set cellSize(value: number) {
        this._cellSize = value;
    }
}
