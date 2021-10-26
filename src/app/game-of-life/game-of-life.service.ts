import { Injectable } from '@angular/core';
import { merge, Observable, Subject, timer } from 'rxjs';
import { filter, map, mapTo, share } from 'rxjs/operators';
import { gameOfLife, Type, World } from './game-of-life';

@Injectable({ providedIn: 'root' })
export class GameOfLifeService {
    public manualTrigger = new Subject();
    public autoTrigger = timer(0, 200).pipe(
        filter(() => this.isStarted),
        mapTo(null)
    );
    public gol?: Generator<World>;
    public creator: Type = 'cell';

    public world$: Observable<World> = merge(
        this.manualTrigger,
        this.autoTrigger
    ).pipe(
        map((command) => this.gol.next(command).value),
        share(),
        filter((x) => !!x)
    );

    public get isStarted() {
        return this._isStarted;
    }

    private _isStarted = false;

    start() {
        this._isStarted = true;
    }

    stop() {
        this._isStarted = false;
    }

    createFigure(col: number, row: number) {
        this.manualTrigger.next({ col, row, creator: this.creator });
    }

    nextGeneration() {
        this.manualTrigger.next();
    }

    create(col: number, row: number) {
        this.manualTrigger.next({ col, row, creator: 'w' });
    }
}
