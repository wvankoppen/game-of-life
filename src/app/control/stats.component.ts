import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GameOfLifeService } from '../game/game-of-life.service';
import { World } from '../model/game-of-life.model';

@Component({
    selector: 'app-game-stats',
    template: `
            <dl>
                <dt>Dimensions</dt>
                <dd *ngIf="evolution$ | async | dimensions as dims">
                    {{ dims.rows }} x {{ dims.cols }}
                </dd>

                <dt>Lives</dt>
                <dd>{{ evolution$ | async | livingCellCount }}</dd>

                <dt>Iterations</dt>
                <dd>{{ evolution$ | async | iterations }}</dd>
            </dl>
    `,
    styles: [
        `
            :host {
                opacity: 0.5;
                padding: 10px;
                border: 1px solid #000;
                position: fixed;
                right: 20px;
                top: 20px;
                background: #ccc;
            }

             dl {
                margin: 0;
            }
        `,
    ],
})
export class StatsComponent {
    constructor(
        public gameOfLifeService: GameOfLifeService,
    ) {}

    get evolution$(): Observable<World> {
        return this.gameOfLifeService.evolution$;
    }
}
