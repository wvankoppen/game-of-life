import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { World } from './game-of-life';
import { GameOfLifeService } from './game-of-life.service';

const size = 10;

@Component({
    selector: 'app-game-of-life-world',
    template: `
        <canvas
            *ngIf="world$ | async | golBox as box"
            [style.width.px]="box.width"
            [style.height.px]="box.height"
            (click)="onClick($event)"
            #canvasElement
        ></canvas>
    `,
})
export class GameOfLifeWorldComponent implements AfterViewInit {
    @ViewChild('canvasElement') canvasElement:
        | ElementRef<HTMLCanvasElement>
        | undefined;

    @Output() golClick = new EventEmitter();

    context: CanvasRenderingContext2D | null | undefined;

    world$: Observable<World>;

    constructor(gameOfLifeService: GameOfLifeService) {
        this.world$ = gameOfLifeService.world$;
    }

    draw(world: World) {
        this.canvasElement!.nativeElement.width = world.length * size;
        this.canvasElement!.nativeElement.height = world[0].length * size;
        this.context = this.canvasElement?.nativeElement.getContext('2d');

        for (let col = 0; col < world.length; col++) {
            for (let row = 0; row < world[0].length; row++) {
                if (world[col][row]) {
                    this.context!.fillStyle = '#FF0000';
                } else {
                    this.context!.fillStyle = '#00FF00';
                }
                this.context?.fillRect(col * 10, row * 10, size, size);
            }
        }
    }

    ngAfterViewInit(): void {
        this.world$.subscribe((w) => this.draw(w));
    }

    onClick($event: MouseEvent) {
        const rect = this.canvasElement!.nativeElement.getBoundingClientRect();
        const col = Math.round(($event.x - rect.x) / size);
        const row = Math.round(($event.y - rect.y) / size);

        this.golClick.emit({ col, row });
    }
}
