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
    world: boolean[] = [];

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
        this.world = new Array(cols * rows).fill(false);
    }

    onClick($event: MouseEvent) {
        const rect = this.canvasElement!.nativeElement.getBoundingClientRect();
        const cell =
            Math.round(($event.x - rect.x) / size) +
            Math.round(($event.y - rect.y) / size) * cols;
        console.log($event.x, $event.y, cell, this.world);
        this.world[cell] = !this.world[cell];
        this.draw();
    }

    draw() {
        for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
                if (this.world[c + r * cols]) {
                    this.context!.fillStyle = '#FF0000';
                } else {
                    this.context!.fillStyle = '#00FFF0';
                }
                this.context?.fillRect(c * 10, r * 10, size, size);
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
        this.world[40 + 15 * cols] = true;
        this.world[39 + 15 * cols] = true;
        this.world[38 + 16 * cols] = true;
        this.world[37 + 17 * cols] = true;
        this.world[37 + 18 * cols] = true;
        this.world[37 + 19 * cols] = true;
        this.world[38 + 20 * cols] = true;
        this.world[39 + 21 * cols] = true;
        this.world[40 + 21 * cols] = true;
        this.draw();
    }

    tick() {
        let newWorld = [];
        for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
                const nbs = this.nbCount(c, r);
                if (nbs < 2) {
                    newWorld[c + r * cols] = false;
                }
                if (nbs == 2 || nbs == 3) {
                    newWorld[c + r * cols] = this.world[c + r * cols];
                }
                if (nbs > 3) {
                    newWorld[c + r * cols] = false;
                }
                if (nbs === 3) {
                    newWorld[c + r * cols] = true;
                }
            }
        }
        this.world = newWorld;
        this.draw();
    }

    nbCount(c: number, r: number): number {
        let nbs = 0;

        if (c > 0 && this.world[c - 1 + r * cols]) nbs++;
        if (c < cols - 1 && this.world[c + 1 + r * cols]) nbs++;
        if (r < rows - 1 && this.world[c + (r + 1) * cols]) nbs++;
        if (r > 0 && this.world[c + (r - 1) * cols]) nbs++;

        if (c > 0 && r > 0 && this.world[c - 1 + (r - 1) * cols]) nbs++;
        if (c > 0 && r < rows - 1 && this.world[c - 1 + (r + 1) * cols]) nbs++;
        if (c < cols - 1 && r > 0 && this.world[c + 1 + (r - 1) * cols]) nbs++;
        if (c < cols - 1 && r < rows - 1 && this.world[c + 1 + (r + 1) * cols])
            nbs++;

        return nbs;
    }
}
