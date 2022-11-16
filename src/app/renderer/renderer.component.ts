import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    NgZone,
    OnInit,
    ViewChild,
} from '@angular/core';
import { debounceTime, tap } from 'rxjs';
import { isAlive } from '../game/logic';
import { runInZone } from '../util/run-in-zone';
import { observeElementSize } from '../util/resize-observer';
import { GameOfLifeService } from '../game/game-of-life.service';

const aliveColor = '#69f0ae';
const deadColor = '#aaaaaa';

const aliveColor2 = '#6cf3af';
const deadColor2 = '#b6b6b6';

@Component({
    selector: 'app-game-renderer',
    template: ` <canvas (click)="onClick($event)" #canvasElement></canvas>`,
    styles: [
        `
            :host {
                display: block;
                height: 100%;
                cursor: pointer;
            }
            canvas {
                width: 100%;
                height: 100%;
                background: #999;
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

    get cellSize(): number {
        return this._cellSize;
    }
    @Input() set cellSize(size: number) {
        this._cellSize = size;
        this.resize();
    }
    private _cellSize: number = 20;

    constructor(
        private host: ElementRef,
        private zone: NgZone,
        private gameOfLife: GameOfLifeService
    ) {}

    ngOnInit() {
        this.gameOfLife.evolution$.subscribe((e) => this.draw(e.cells));
    }

    onCanvasChangeSize(observerEntry: ResizeObserverEntry) {
        this.canvasElement!.nativeElement.width =
            observerEntry.contentRect.width;
        this.canvasElement!.nativeElement.height =
            observerEntry.contentRect.height;
        this.resize();
    }

    resize() {
        if (!this.canvasElement?.nativeElement) {
            return;
        }
        this.gameOfLife.resize(
            Math.ceil(this.canvasElement!.nativeElement.height / this.cellSize),
            Math.ceil(this.canvasElement!.nativeElement.width / this.cellSize)
        );
    }

    ngAfterViewInit() {
        this.initCanvas();
        this.observeCanvas();
    }

    onClick($event: MouseEvent) {
        const rect = this.canvasElement!.nativeElement.getBoundingClientRect();
        const col = Math.floor(($event.x - rect.x) / this.cellSize);
        const row = Math.floor(($event.y - rect.y) / this.cellSize);
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
            this.canvasElement!.nativeElement.width,
            this.canvasElement!.nativeElement.height
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
                    ? col % 10 === 0 || row % 10 === 0
                        ? aliveColor2
                        : aliveColor
                    : col % 10 === 0 || row % 10 === 0
                    ? deadColor2
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

    private initCanvas() {
        this.context = this.canvasElement?.nativeElement.getContext('2d');
    }

    private observeCanvas() {
        observeElementSize(this.canvasElement!.nativeElement)
            .pipe(
                debounceTime(100),
                runInZone(this.zone),
                tap((v) => this.onCanvasChangeSize(v[0]))
            )
            .subscribe();
    }
}
