import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';

const cols = 80;
const rows = 60;
const size = 10;

@Component({
    selector: 'app-root',
    template: `
        <button (click)="tick()">Tick</button>
        <button (click)="start()" [disabled]="isStarted">Start</button>
        <button (click)="stop()" [disabled]="!isStarted">Stop</button>
        <button (click)="load()">Load</button>
        <canvas
            [style.width.px]="width"
            [style.height.px]="height"
            (click)="onClick($event)"
            #canvasElement
        ></canvas>
    `,
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'game-of-life';
    world: boolean[][] = [];

    @ViewChild('canvasElement')
    canvasElement: ElementRef<HTMLCanvasElement> | undefined;

    context: CanvasRenderingContext2D | null | undefined;
    private interval: any;

    ngAfterViewInit(): void {
        this.canvasElement!.nativeElement.width = cols * size;
        this.canvasElement!.nativeElement.height = rows * size;
        this.context = this.canvasElement?.nativeElement.getContext('2d');

        this.draw();
    }

    get width() {
        return cols * size;
    }

    get height() {
        return rows * size;
    }

    ngOnInit() {
        this.createWorld();
    }

    get isStarted(): boolean {
        return !!this.interval;
    }

    createWorld() {
        this.world = new Array(cols).fill(new Array(rows));
    }

    onClick($event: MouseEvent) {
        const rect = this.canvasElement!.nativeElement.getBoundingClientRect();
        const col = Math.round(($event.x - rect.x) / size);
        const row = Math.round(($event.y - rect.y) / size);
        this.world[col][row] = !this.world[col][row];
        this.draw();
    }

    draw() {
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                if (this.world[col][row]) {
                    this.context!.fillStyle = '#FF0000';
                } else {
                    this.context!.fillStyle = '#00FFF0';
                }
                this.context?.fillRect(col * 10, row * 10, size, size);
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

    load() {
        this.world[40][15] = true;
        this.world[39][15] = true;
        this.world[38][16] = true;
        this.world[37][17] = true;
        this.world[37][18] = true;
        this.world[37][19] = true;
        this.world[38][20] = true;
        this.world[39][21] = true;
        this.world[40][21] = true;
        this.draw();
    }

    tick() {
        let newWorld: boolean[][] = [];
        for (let col = 0; col < cols; col++) {
            newWorld[col] = [];
            for (let row = 0; row < rows; row++) {
                const neighbors = this.countNeighbors(col, row);
                if (neighbors < 2) {
                    newWorld[col][row] = false;
                }
                if (neighbors == 2 || neighbors == 3) {
                    newWorld[col][row] = this.world[col][row];
                }
                if (neighbors > 3) {
                    newWorld[col][row] = false;
                }
                if (neighbors === 3) {
                    newWorld[col][row] = true;
                }
            }
        }
        this.world = newWorld;
        this.draw();
    }

    countNeighbors(col: number, row: number): number {
        let neighbors = 0;

        if (col > 0 && this.world[col - 1][row]) neighbors++;
        if (col < cols - 1 && this.world[col + 1][row]) neighbors++;
        if (row < rows - 1 && this.world[col][row + 1]) neighbors++;
        if (row > 0 && this.world[col][row - 1]) neighbors++;

        if (col > 0 && row > 0 && this.world[col - 1][row - 1]) neighbors++;
        if (col > 0 && row < rows - 1 && this.world[col - 1][row + 1]) neighbors++;
        if (col < cols - 1 && row > 0 && this.world[col + 1][row - 1]) neighbors++;
        if (col < cols - 1 && row < rows - 1 && this.world[col + 1][row + 1])
            neighbors++;

        return neighbors;
    }
}
