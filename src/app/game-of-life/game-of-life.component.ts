import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { World } from './game-of-life';
import { figures } from './game-of-life.model';

const aliveColor = '#fce114';
const deadColor = '#a9a89f';

@Component({
    selector: 'app-game-of-life',
    template: ` <div class="game-of-life__control">
            <button mat-button (click)="recreateWorld()">
                Recreate empty world
            </button>
            <button
                mat-button
                (click)="tick()"
                color="primary"
                [disabled]="isStarted"
            >
                Tick
            </button>
            <button mat-button (click)="start()" *ngIf="!isStarted">
                Start
            </button>
            <button mat-button (click)="stop()" *ngIf="isStarted">Stop</button>

            Size:
            <mat-slider
                min="10"
                max="100"
                step="1"
                [(ngModel)]="size"
            ></mat-slider>
            Delay:
            <mat-slider
                min="10"
                max="100"
                step="1"
                [(ngModel)]="delay"
            ></mat-slider>
            Iterations: {{ world.iterations }}
            <select [(ngModel)]="nextFigure">
                <option
                    *ngFor="let figure of availableFigures"
                    [value]="figure"
                >
                    {{ figure }}
                </option>
            </select>
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
                background: #CCC;
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
    private _size: number = 10;
    private _delay: number = 10;
    private interval: any;

    availableFigures: string[] = Object.keys(figures);
    nextFigure: string =
        this.availableFigures[this.availableFigures.length - 1];

    get isStarted(): boolean {
        return !!this.interval;
    }

    get delay(): number {
        return this._delay;
    }

    set delay(value: number) {
        this._delay = value;
        this.checkRestart();
    }

    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
        this.resize();
    }

    ngOnInit() {
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

        this.world.draw(figures[this.nextFigure], { col, row });

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
        this.interval = setInterval(() => this.tick(), this.delay);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    private checkRestart() {
        if (this.isStarted) {
            this.stop();
            this.start();
        }
    }

    tick() {
        this.world.tick();
        this.draw();
    }

    private createWorld() {
        const cols = Math.ceil(window.innerWidth / this.size);
        const rows = Math.ceil(window.innerHeight / this.size);
        this.world = new World(cols, rows);
    }

    private resize() {
        this.canvasElement!.nativeElement.width = window.innerWidth;
        this.canvasElement!.nativeElement.height = window.innerHeight;
        this.draw();
    }

    private initCanvas() {
        this.resize();
        this.context = this.canvasElement?.nativeElement.getContext('2d');
    }
}
