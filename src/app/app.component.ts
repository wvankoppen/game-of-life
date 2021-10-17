import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { createCell, createSpaceShip, gameOfLife, Type, World } from './game-of-life'

const cols = 80;
const rows = 60;
const size = 10;

@Component({
    selector: 'app-root',
    template: `
        <button (click)="nextGeneration()">Tick</button>
        <button (click)="start()" [disabled]="isStarted">Start</button>
        <button (click)="stop()" [disabled]="!isStarted">Stop</button>
        <select [(ngModel)]="type">
            <option *ngFor="let type of types" [value]="type">
                {{ type }}
            </option>
        </select>
        <canvas
            [style.width.px]="width"
            [style.height.px]="height"
            (click)="onClick($event)"
            #canvasElement
        ></canvas>
    `,
})
export class AppComponent implements AfterViewInit {
    title = 'game-of-life';
    world!: World;

    types: Type[] = ['cell', 'spaceship-light'];
    type: Type = 'cell';

    @ViewChild('canvasElement')
    canvasElement: ElementRef<HTMLCanvasElement> | undefined;

    context: CanvasRenderingContext2D | null | undefined;
    private interval: any;
    private gameOfLife = gameOfLife(cols, rows);

    ngAfterViewInit(): void {
        this.canvasElement!.nativeElement.width = cols * size;
        this.canvasElement!.nativeElement.height = rows * size;
        this.context = this.canvasElement?.nativeElement.getContext('2d');

        this.nextGeneration();
    }

    get width() {
        return cols * size;
    }

    get height() {
        return rows * size;
    }

    get isStarted(): boolean {
        return !!this.interval;
    }

    onClick($event: MouseEvent) {
        const rect = this.canvasElement!.nativeElement.getBoundingClientRect();
        const col = Math.round(($event.x - rect.x) / size);
        const row = Math.round(($event.y - rect.y) / size);

        if (this.type === 'cell') {
            createCell(this.world, col, row);
        }
        if (this.type === 'spaceship-light') {
            createSpaceShip(this.world, col, row);
        }

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
        this.interval = setInterval(() => this.nextGeneration(), 10);
    }

    nextGeneration() {
        this.world = this.gameOfLife.next().value;
        this.draw();
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

}
