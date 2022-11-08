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
            <button (click)="recreateWorld()">Recreate empty world</button>
            <button (click)="tick()" [disabled]="isStarted">Tick</button>
            <button (click)="start()" [disabled]="isStarted">Start</button>
            <button (click)="stop()" [disabled]="!isStarted">Stop</button>
            Size: <input type="text" size="3" [(ngModel)]="size" /> Delay:
            <input type="text" size="3" [(ngModel)]="delay" />
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
            :host {
                display: block;
                height: 100%;
            }
            canvas {
                width: 100%;
                height: 100%;
                position: absolute;
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
    size: number = 10;
    delay: number = 10;
    private interval: any;

    availableFigures: string[] = Object.keys(figures);
    nextFigure: string = this.availableFigures[0];

    get isStarted(): boolean {
        return !!this.interval;
    }

    ngOnInit() {
        this.createWorld();
    }

    ngAfterViewInit() {
        this.initCanvas();
        this.draw();
    }

    recreateWorld() {
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
        for (let col = 0; col < this.world.cols; col++) {
            for (let row = 0; row < this.world.rows; row++) {
                this.context!.fillStyle = this.world.isAlive({
                    col,
                    row,
                })
                    ? aliveColor
                    : deadColor;
                this.context?.fillRect(
                    col * this.size,
                    row * this.size,
                    this.size,
                    this.size
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

    tick() {
        this.world.tick();
        this.draw();
    }

    private createWorld() {
        const cols = Math.ceil(window.innerWidth / this.size);
        const rows = Math.ceil(window.innerHeight / this.size);
        this.world = new World(cols, rows);
    }

    private initCanvas() {
        this.canvasElement!.nativeElement.width = window.innerWidth;
        this.canvasElement!.nativeElement.height = window.innerHeight;
        this.context = this.canvasElement?.nativeElement.getContext('2d');
    }
}
