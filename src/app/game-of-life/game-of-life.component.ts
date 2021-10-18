import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { World } from '../game-of-life';
import { GameOfLifeStore } from './game-of-life.store';

const size = 10;

@Component({
    selector: 'app-game-of-life',
    template: `
        <canvas
            [style.width.px]="width"
            [style.height.px]="height"
            (click)="onClick($event)"
            #canvasElement
        ></canvas>
    `
})
export class GameOfLifeComponent implements AfterViewInit {
    @ViewChild('canvasElement')
    canvasElement: ElementRef<HTMLCanvasElement> | undefined;

    @Output() golClick = new EventEmitter();

    context: CanvasRenderingContext2D | null | undefined;

    constructor(private gameOfLifeStore: GameOfLifeStore) {}

    draw(world: World) {
        this.canvasElement!.nativeElement.width = world.length * size;
        this.canvasElement!.nativeElement.height = world[0].length * size;
        this.context = this.canvasElement?.nativeElement.getContext('2d');

        for (let col = 0; col < world.length; col++) {
            for (let row = 0; row < world[0].length; row++) {
                if (world[col][row]) {
                    this.context!.fillStyle = '#FF0000';
                } else {
                    this.context!.fillStyle = '#00FFF0';
                }
                this.context?.fillRect(col * 10, row * 10, size, size);
            }
        }
    }

    ngAfterViewInit(): void {
        this.gameOfLifeStore.world$.subscribe((s) => this.draw(s.world!));
    }

    get width() {
        return this.gameOfLifeStore.world$.pipe(
            map((s) => s.world!.length * size)
        );
    }

    get height() {
        return this.gameOfLifeStore.world$.pipe(
            map((s) => s.world![0].length * size)
        );
    }

    onClick($event: MouseEvent) {
        const rect = this.canvasElement!.nativeElement.getBoundingClientRect();
        const col = Math.round(($event.x - rect.x) / size);
        const row = Math.round(($event.y - rect.y) / size);

        this.golClick.emit({ col, row });
    }
}
