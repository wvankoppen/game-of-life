import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { matrix, vector } from '../util/array';
import { Coordinate, figures, World } from "../model/game-of-life.model";
import { cols, contains, countNeighbors, rows } from "./logic";


@Injectable({
    providedIn: 'root',
})
export class GameOfLifeService {
    private interval: any;
    figures = figures;
    private _evolution: BehaviorSubject<World>;
    evolution$: Observable<World>;
    private _speed: number = 50;

    constructor() {
        const init = { cells: matrix(0, 0), iteration: 0 };
        this._evolution = new BehaviorSubject(init);
        this.evolution$ = this._evolution.asObservable();
    }

    public reset() {
        const init = {
            cells: matrix(
                rows(this._evolution.value.cells),
                cols(this._evolution.value.cells)
            ),
            iteration: 0,
        };
        this._evolution.next(init);
    }

    public resize(newRows: number, newCols: number) {
        console.log('resize', newRows, newCols);
        const diffRows = Math.abs(rows(this._evolution.value.cells) - newRows);
        const diffRowsTop = Math.ceil(diffRows / 2);
        const diffRowsBottom = Math.floor(diffRows / 2);

        if (rows(this._evolution.value.cells) > newRows) {
            this._evolution.value.cells = this._evolution.value.cells.slice(
                diffRowsTop,
                rows(this._evolution.value.cells) - diffRowsBottom
            );
        } else if (rows(this._evolution.value.cells) < newRows) {
            this._evolution.next({
                cells: [
                    ...matrix(diffRowsTop, newCols),
                    ...this._evolution.value.cells,
                    ...matrix(diffRowsBottom, newCols),
                ],
                iteration: this._evolution.value.iteration,
            });
        }

        let diffCols = Math.abs(cols(this._evolution.value.cells) - newCols);
        const diffColsLeft = Math.ceil(diffCols / 2);
        const diffColsRight = Math.floor(diffCols / 2);

        if (cols(this._evolution.value.cells) > newCols) {
            this._evolution.next({
                cells: this._evolution.value.cells.map((row) =>
                    row.slice(
                        diffColsLeft,
                        cols(this._evolution.value.cells) - diffColsRight
                    )
                ),
                iteration: this._evolution.value.iteration,
            });
        } else if (cols(this._evolution.value.cells) < newCols) {
            this._evolution.next({
                cells: this._evolution.value.cells.map((row) => [
                    ...vector(diffColsLeft),
                    ...row,
                    ...vector(diffColsRight),
                ]),
                iteration: this._evolution.value.iteration++,
            });
        }
    }

    public toggle(cell: Coordinate) {
        const cells = [...this._evolution.value.cells];
        cells[cell.row][cell.col] =
            !this._evolution.value.cells[cell.row][cell.col];
        this._evolution.next({
            cells,
            iteration: this._evolution.value.iteration,
        });
    }

    public setAlive(cell: Coordinate, state: boolean): boolean {
        // TODO: Use subject.next
        return (this._evolution.value.cells[cell.row][cell.col] = state);
    }

    public evolve() {
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

    public add(figure: string, center: Coordinate) {
        const rowData = figure.trim().split('\n');
        const rows = rowData.length;
        const cols = rowData[0].length;
        const offsetCol = Math.round(cols / 2);
        const offsetRow = Math.round(rows / 2);
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                const x = col + center.col - offsetCol;
                const y = row + center.row - offsetRow;
                if (contains({ col: x, row: y }, this._evolution.value.cells))
                    this.setAlive(
                        { col: x, row: y },
                        rowData[row][col] === 'X'
                    );
            }
        }
    }

    start() {
        this.interval = setInterval(() => this.tick(), 1000 / this.speed);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    tick() {
        this.evolve();
    }

    private checkRestart() {
        if (this.isStarted) {
            this.stop();
            this.start();
        }
    }
    //
    // private getDims() {
    //     const cols = Math.ceil(window.innerWidth / this._evolution.valueize);
    //     const rows = Math.ceil(window.innerHeight / this._evolution.valueize);
    //     return { rows, cols };
    // }
}
