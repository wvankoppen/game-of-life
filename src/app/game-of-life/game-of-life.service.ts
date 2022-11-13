import { Injectable } from '@angular/core';
import { Coordinate, figures } from './game-of-life.model';
import { BehaviorSubject } from 'rxjs';
import { matrix, vector } from '../util/array';

interface World {
    cells: boolean[][];
    iteration: number;
}

@Injectable({
    providedIn: 'root',
})
export class GameOfLifeService {
    private interval: any;
    figures = figures;
    evolution: BehaviorSubject<World>;
    private _speed: number = 50;

    constructor() {
        const init = { cells: matrix(0, 0), iteration: 0 };
        this.evolution = new BehaviorSubject(init);
    }

    public reset() {
        const init = {
            cells: matrix(
                rows(this.evolution.value.cells),
                cols(this.evolution.value.cells)
            ),
            iteration: 0,
        };
        this.evolution = new BehaviorSubject(init);
    }

    public resize(newRows: number, newCols: number) {
        console.log('resize', newRows, newCols);
        const diffRows = Math.abs(rows(this.evolution.value.cells) - newRows);
        const diffRowsTop = Math.ceil(diffRows / 2);
        const diffRowsBottom = Math.floor(diffRows / 2);

        if (rows(this.evolution.value.cells) > newRows) {
            this.evolution.value.cells = this.evolution.value.cells.slice(
                diffRowsTop,
                rows(this.evolution.value.cells) - diffRowsBottom
            );
        } else if (rows(this.evolution.value.cells) < newRows) {
            this.evolution.next({
                cells: [
                    ...matrix(diffRowsTop, newCols),
                    ...this.evolution.value.cells,
                    ...matrix(diffRowsBottom, newCols),
                ],
                iteration: this.evolution.value.iteration,
            });
        }

        let diffCols = Math.abs(cols(this.evolution.value.cells) - newCols);
        const diffColsLeft = Math.ceil(diffCols / 2);
        const diffColsRight = Math.floor(diffCols / 2);

        if (cols(this.evolution.value.cells) > newCols) {
            this.evolution.next({
                cells: this.evolution.value.cells.map((row) =>
                    row.slice(
                        diffColsLeft,
                        cols(this.evolution.value.cells) - diffColsRight
                    )
                ),
                iteration: this.evolution.value.iteration,
            });
        } else if (cols(this.evolution.value.cells) < newCols) {
            this.evolution.next({
                cells: this.evolution.value.cells.map((row) => [
                    ...vector(diffColsLeft),
                    ...row,
                    ...vector(diffColsRight),
                ]),
                iteration: this.evolution.value.iteration++,
            });
        }
    }

    public toggle(cell: Coordinate) {
        const cells = [...this.evolution.value.cells];
        cells[cell.row][cell.col] =
            !this.evolution.value.cells[cell.row][cell.col];
        this.evolution.next({
            cells,
            iteration: this.evolution.value.iteration,
        });
    }

    public setAlive(cell: Coordinate, state: boolean): boolean {
        // TODO: Use subject.next
        return (this.evolution.value.cells[cell.row][cell.col] = state);
    }

    public evolve() {
        let newWorld: boolean[][] = [];
        for (let row = 0; row < rows(this.evolution.value.cells); row++) {
            newWorld[row] = [];
            for (let col = 0; col < cols(this.evolution.value.cells); col++) {
                const neighbors = countNeighbors(
                    { col, row },
                    this.evolution.value.cells
                );
                if (neighbors < 2) {
                    newWorld[row][col] = false;
                }
                if (neighbors === 2) {
                    newWorld[row][col] = this.evolution.value.cells[row][col];
                }
                if (neighbors === 3) {
                    newWorld[row][col] = true;
                }
                if (neighbors > 3) {
                    newWorld[row][col] = false;
                }
            }
        }
        this.evolution.next({
            cells: newWorld,
            iteration: this.evolution.value.iteration + 1,
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
                if (contains({ col: x, row: y }, this.evolution.value.cells))
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
    //     const cols = Math.ceil(window.innerWidth / this.evolution.valueize);
    //     const rows = Math.ceil(window.innerHeight / this.evolution.valueize);
    //     return { rows, cols };
    // }
}

export function rows(cells: boolean[][]): number {
    return cells.length;
}

export function cols(cells: boolean[][]): number {
    return cells[0].length;
}

export function hasLife(cells: boolean[][]): boolean {
    return livingCellCount(cells) > 0;
}

export function livingCellCount(cells: boolean[][]): number {
    return cells.reduce((acc, cur) => cur.filter((c) => c).length + acc, 0);
}

export function isAlive(cell: Coordinate, cells: boolean[][]): boolean {
    return cells[cell.row][cell.col];
}

export function contains(cell: Coordinate, cells: boolean[][]): boolean {
    return (
        cells[cell.row] !== undefined && cells[cell.row][cell.col] !== undefined
    );
}

export function countNeighbors(cell: Coordinate, cells: boolean[][]): number {
    let neighborCount = 0;

    if (cell.row > 0 && cells[cell.row - 1][cell.col]) neighborCount++;
    if (cell.row < rows(cells) - 1 && cells[cell.row + 1][cell.col])
        neighborCount++;
    if (cell.col < cols(cells) - 1 && cells[cell.row][cell.col + 1])
        neighborCount++;
    if (cell.col > 0 && cells[cell.row][cell.col - 1]) neighborCount++;

    if (cell.row > 0 && cell.col > 0 && cells[cell.row - 1][cell.col - 1])
        neighborCount++;
    if (
        cell.row > 0 &&
        cell.col < cols(cells) - 1 &&
        cells[cell.row - 1][cell.col + 1]
    )
        neighborCount++;
    if (
        cell.row < rows(cells) - 1 &&
        cell.col > 0 &&
        cells[cell.row + 1][cell.col - 1]
    )
        neighborCount++;
    if (
        cell.row < rows(cells) - 1 &&
        cell.col < cols(cells) - 1 &&
        cells[cell.row + 1][cell.col + 1]
    )
        neighborCount++;

    return neighborCount;
}
