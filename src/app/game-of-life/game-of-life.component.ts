import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    createSpaceShip,
    toggleCell,
    GolFigure,
    World,
    createNextGeneration,
} from './game-of-life';

@Component({
    selector: 'app-game-of-life',
    template: ` <div class="game-of-life__control">
            <button (click)="recreateWorld()">Recreate empty world</button>
            <button (click)="tick()">Tick</button>
            <button (click)="start()" [disabled]="isStarted">Start</button>
            <button (click)="stop()" [disabled]="!isStarted">Stop</button>
            <input type="text" size="3" [(ngModel)]="size" />
            <select [(ngModel)]="drawType">
                <option *ngFor="let type of drawTypes" [value]="type">
                    {{ type }}
                </option>
            </select>
        </div>
        <canvas (click)="onClick($event)" #canvasElement></canvas>`,
    styles: [
        `
            :host {
                display: block;
                background: red;
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
    private interval: any;

    drawType: GolFigure = 'spaceship-light';
    drawTypes: GolFigure[] = ['cell', 'spaceship-light'];

    get cols(): number {
        return this.world.length;
    }

    get rows(): number {
        return this.world[0].length;
    }

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

    createWorld() {
        const cols = Math.ceil(window.innerWidth / this.size);
        const rows = Math.ceil(window.innerHeight / this.size);
        this.world = new Array(cols)
            .fill(null)
            .map((_) => new Array(rows).fill(false));
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

        if (this.drawType === 'cell') {
            toggleCell(this.world, col, row);
        }
        if (this.drawType === 'spaceship-light') {
            createSpaceShip(this.world, col, row);
        }

        this.draw();
    }

    draw() {
        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                if (this.world[col][row]) {
                    this.context!.fillStyle = '#FF0000';
                } else {
                    this.context!.fillStyle = '#00FFF0';
                }
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
        this.interval = setInterval(() => this.tick(), 100);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    tick() {
        this.world = createNextGeneration(this.world);
        this.draw();
    }

    private initCanvas() {
        this.canvasElement!.nativeElement.width = window.innerWidth;
        this.canvasElement!.nativeElement.height = window.innerHeight;
        this.context = this.canvasElement?.nativeElement.getContext('2d');
    }
}
