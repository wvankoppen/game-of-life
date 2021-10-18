import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { filter } from 'rxjs/operators'
import { World } from '../game-of-life'

export interface GameOfLifeState {
    world?: World;
}

@Injectable({providedIn: 'root'})
export class GameOfLifeStore extends ComponentStore<GameOfLifeState> {
    constructor() {
        super({ world: undefined });
    }

    public world$ = this.state$.pipe(filter((s) => !!s.world));
}
