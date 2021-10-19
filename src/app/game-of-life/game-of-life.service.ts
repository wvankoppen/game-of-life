import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, Subject, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { gameOfLife, Type, World } from './game-of-life';

@Injectable({ providedIn: 'root' })
export class GameOfLifeService {
    public trigger = new Subject();
    public gol: Generator<World> = gameOfLife(100, 100);
    public creator: Type = 'cell';

    public world$: Observable<World> = this.trigger.pipe(
        map((comm) => this.gol.next(comm).value)
    );

    public get isStarted() {
        return this._isStarted;
    }

    private _isStarted = false;

    start() {
        this._isStarted = true;
        this.trigger.next(timer(0, 100));
    }

    stop() {
        this._isStarted = false;
        this.trigger.next(EMPTY);
    }

    create(col: number, row: number) {
        this.trigger.next({ col, row, creator: this.creator });
    }

    nextGeneration() {
        this.trigger.next(of());
    }
}
