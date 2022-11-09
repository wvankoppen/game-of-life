import {
    AfterViewInit,
    Component,
    ElementRef,
    NgZone,
    OnInit,
    ViewChild,
} from '@angular/core';
import { debounceTime, Observable, tap } from 'rxjs';
import { runInZone } from '../util/run-in-zone';
import { observeElementSize } from '../util/resize-observer';
import { World } from './game-of-life';
import { figures } from './game-of-life.model';

const aliveColor = '#fce114';
const deadColor = '#a9a89f';

@Component({
    selector: 'app-game-of-life',
    template: ` <div class="game-of-life__control">
            <button mat-button *ngIf="world.hasLife" (click)="recreateWorld()">
                Clear
            </button>
            <button
                mat-button
                (click)="tick()"
                color="primary"
                [disabled]="isStarted || !world.hasLife"
            >
                Tick
            </button>
            <button mat-button (click)="start()" *ngIf="!isStarted">
                Start
            </button>
            <button mat-button (click)="stop()" *ngIf="isStarted">Stop</button>

            Granularity:
            <mat-slider
                [min]="sizeMin"
                [max]="sizeMax"
                step="1"
                [(ngModel)]="size"
            ></mat-slider>
            Speed:
            <mat-slider
                [min]="speedMin"
                [max]="speedMax"
                step="1"
                [(ngModel)]="speed"
            ></mat-slider>
            Iterations: {{ world.iterations }}
            <mat-form-field>
                <mat-select [(ngModel)]="nextFigure">
                    <mat-option
                        *ngFor="let figure of availableFigures"
                        [value]="figure"
                    >
                        <pre>{{ figure }}</pre>
                    </mat-option>
                </mat-select>
            </mat-form-field>
            {{ size$ | async | json }}
            [{{ world.rows }},{{ world.cols }}],
        </div>
        <canvas (click)="onClick($event)" #canvasElement></canvas>`,
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
            .game-of-life__control {
                z-index: 1;
                position: absolute;
            }
        `,
    ],
})
export class GameOfLifeComponent implements OnInit, AfterViewInit {
    @ViewChild('canvasElement')
    canvasElement: ElementRef<HTMLCanvasElement> | undefined;

    context: CanvasRenderingContext2D | null | undefined;
    world!: World;

    speedMin = 1;
    speedMax = 100;
    sizeMin = 5;
    sizeMax = 10;
    private _size: number = 10;
    private _speed: number = this.speedMax / 2;
    private interval: any;

    figures = figures;
    availableFigures: string[] = Object.keys(figures);
    nextFigure: string =
        this.availableFigures[this.availableFigures.length - 1];

    get isStarted(): boolean {
        return !!this.interval;
    }

    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = value;
        this.checkRestart();
    }

    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
        this.resize();
    }

    size$?: Observable<any>;

    constructor(private host: ElementRef, private zone: NgZone) {}

    ngOnInit() {
        this.size$ = observeElementSize(this.host.nativeElement).pipe(
            debounceTime(100),
            runInZone(this.zone),
            tap((_x) => this.resize()),
            tap(console.log)
        );

        this.createWorld();
    }

    ngAfterViewInit() {
        this.initCanvas();
        this.draw();
    }

    recreateWorld() {
        this.stop();
        this.createWorld();
        this.initCanvas();
        this.draw();
    }

    onClick($event: MouseEvent) {
        const rect = this.canvasElement!.nativeElement.getBoundingClientRect();
        const col = Math.round(($event.x - rect.x) / this.size);
        const row = Math.round(($event.y - rect.y) / this.size);

        this.world.add(figures[this.nextFigure], { col, row });

        this.draw();
    }

    draw() {
        if (!this.context) {
            return;
        }
        this.context!.clearRect(
            0,
            0,
            this.world.rows * this.size,
            this.world.cols * this.size
        );
        for (let col = 0; col < this.world.cols; col++) {
            for (let row = 0; row < this.world.rows; row++) {
                this.context!.fillStyle = this.world.isAlive({
                    col,
                    row,
                })
                    ? aliveColor
                    : deadColor;
                this.context!.fillRect(
                    col * this.size,
                    row * this.size,
                    this.size - 1,
                    this.size - 1
                );
            }
        }
    }

    start() {
        this.interval = setInterval(() => this.tick(), 1000 / this.speed);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    tick() {
        this.world.tick();
        this.draw();
    }

    private checkRestart() {
        if (this.isStarted) {
            this.stop();
            this.start();
        }
    }

    private getDims() {
        const cols = Math.ceil(window.innerWidth / this.size);
        const rows = Math.ceil(window.innerHeight / this.size);
        return { rows, cols };
    }

    private createWorld() {
        const { cols, rows } = this.getDims();
        this.world = new World(cols, rows);
    }

    private initCanvas() {
        this.resize();
        this.context = this.canvasElement?.nativeElement.getContext('2d');
        this.canvasElement!.nativeElement.width = window.innerWidth;
        this.canvasElement!.nativeElement.height = window.innerHeight;
    }

    private resize() {
        this.canvasElement!.nativeElement.width = window.innerWidth;
        this.canvasElement!.nativeElement.height = window.innerHeight;
        const { cols, rows } = this.getDims();
        this.world.resize(cols, rows);
        this.draw();
    }
}
