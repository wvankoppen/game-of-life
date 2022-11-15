import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { matrix, vector } from '../util/array';
import { Coordinate, World } from '../model/game-of-life.model';
import { cols, contains, countNeighbors, rows } from './logic';

@Injectable({
    providedIn: 'root',
})
export class GameOfLifeService {
    private interval: any;
    private _evolution: BehaviorSubject<World>;
    evolution$: Observable<World>;
    private _speed: number = 50;

    brush?: string;

    constructor() {
        const init = { cells: matrix(0, 0), iteration: 0 };
        this._evolution = new BehaviorSubject(init);
        this.evolution$ = this._evolution.asObservable();
    }

    reset() {
        const init = {
            cells: matrix(
                rows(this._evolution.value.cells),
                cols(this._evolution.value.cells)
            ),
            iteration: 0,
        };
        this._evolution.next(init);
    }

    resize(newRows: number, newCols: number) {
        console.log('resize', newRows, newCols);
        let cells = this._evolution.value.cells;
        const diffRows = Math.abs(rows(cells) - newRows);
        const diffRowsTop = Math.ceil(diffRows / 2);
        const diffRowsBottom = Math.floor(diffRows / 2);

        if (rows(cells) > newRows) {
            cells = cells.slice(diffRowsTop, rows(cells) - diffRowsBottom);
        } else if (rows(cells) < newRows) {
            cells = [
                ...matrix(diffRowsTop, newCols),
                ...cells,
                ...matrix(diffRowsBottom, newCols),
            ];
        }

        let diffCols = Math.abs(cols(cells) - newCols);
        const diffColsLeft = Math.ceil(diffCols / 2);
        const diffColsRight = Math.floor(diffCols / 2);

        if (cols(cells) > newCols) {
            cells = cells.map((row) =>
                row.slice(diffColsLeft, cols(cells) - diffColsRight)
            );
        } else if (cols(cells) < newCols) {
            cells = cells.map((row) => [
                ...vector(diffColsLeft),
                ...row,
                ...vector(diffColsRight),
            ]);
        }

        this._evolution.next({
            cells,
            iteration: this._evolution.value.iteration,
        });
    }

    evolve() {
        let newWorld: boolean[][] = [];
        for (let row = 0; row < rows(this._evolution.value.cells); row++) {
            newWorld[row] = [];
            for (let col = 0; col < cols(this._evolution.value.cells); col++) {
                const neighbors = countNeighbors(
                    { col, row },
                    this._evolution.value.cells
                );
                if (neighbors < 2) {
                    newWorld[row][col] = false;
                }
                if (neighbors === 2) {
                    newWorld[row][col] = this._evolution.value.cells[row][col];
                }
                if (neighbors === 3) {
                    newWorld[row][col] = true;
                }
                if (neighbors > 3) {
                    newWorld[row][col] = false;
                }
            }
        }
        this._evolution.next({
            cells: newWorld,
            iteration: this._evolution.value.iteration + 1,
        });
    }

    get isStarted(): boolean {
        return !!this.interval;
    }

    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = value;
        this.checkRestart();
    }

    paint(center: Coordinate) {
        if (!this.brush) {
            throw new Error('No brush set');
        }

        const cells = this._evolution.value.cells;

        const rowData = this.brush.trim().split('\n');
        const rows = rowData.length;
        const cols = rowData[0].length;
        const offsetCol = Math.round(cols / 2);
        const offsetRow = Math.round(rows / 2);
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                const x = col + center.col - offsetCol;
                const y = row + center.row - offsetRow;
                if (contains({ col: x, row: y }, cells))
                    cells[y][x] = rowData[row][col] === 'X';
            }
        }

        this._evolution.next({
            cells,
            iteration: this._evolution.value.iteration,
        });
    }

    start() {
        const interval = Math.round(2000 / this.speed);
        if (this.interval) {
            throw new Error('First clear existing interval!');
        }
        this.interval = setInterval(() => this.evolve(), interval);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    private checkRestart() {
        if (this.isStarted) {
            this.stop();
            this.start();
        }
    }
}
