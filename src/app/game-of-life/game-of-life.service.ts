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

    public get rows(): number {
        return this.evolution.value.cells.length;
    }

    public reset() {
        const init = { cells: matrix(this.rows, this.cols), iteration: 0 };
        this.evolution = new BehaviorSubject(init);
    }

    public resize(cols: number, rows: number) {
        const diffRows = Math.abs(this.rows - rows);
        const diffRowsTop = Math.ceil(diffRows / 2);
        const diffRowsBottom = Math.floor(diffRows / 2);

        if (this.rows > rows) {
            this.evolution.value.cells = this.evolution.value.cells.slice(
                diffRowsTop,
                this.rows - diffRowsBottom
            );
        } else if (this.rows < rows) {
            this.evolution.next({
                cells: [
                    ...matrix(diffRowsTop, cols),
                    ...this.evolution.value.cells,
                    ...matrix(diffRowsBottom, cols),
                ],
                iteration: this.evolution.value.iteration,
            });
        }

        let diffCols = Math.abs(this.cols - cols);
        const diffColsLeft = Math.ceil(diffCols / 2);
        const diffColsRight = Math.floor(diffCols / 2);

        if (this.cols > cols) {
            this.evolution.next({
                cells: this.evolution.value.cells.map((row) =>
                    row.slice(diffColsLeft, this.cols - diffColsRight)
                ),
                iteration: this.evolution.value.iteration,
            });
        } else if (this.cols < cols) {
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

    public get cols(): number {
        return this.evolution.value.cells[0].length;
    }

    public get hasLife(): boolean {
        return this.livingCellCount > 0;
    }

    public get livingCellCount(): number {
        return this.evolution.value.cells.reduce(
            (acc, cur) => cur.filter((c) => c).length + acc,
            0
        );
    }

    public toggle(cell: Coordinate) {
        // this.evolution.next({cells: this.evolution.value.cells[cell.row][cell.col] = !this.evolution.value.cells[cell.row][cell.col]);
    }

    public isAlive(cell: Coordinate): boolean {
        return this.evolution.value.cells[cell.row][cell.col];
    }

    public setAlive(cell: Coordinate, state: boolean): boolean {
        // TODO: Use subject.next
        return (this.evolution.value.cells[cell.row][cell.col] = state);
    }

    public contains(cell: Coordinate): boolean {
        return (
            this.evolution.value.cells[cell.row] !== undefined &&
            this.evolution.value.cells[cell.row][cell.col] !== undefined
        );
    }

    public evolve() {
        let newWorld: boolean[][] = [];
        for (let row = 0; row < this.rows; row++) {
            newWorld[row] = [];
            for (let col = 0; col < this.cols; col++) {
                const neighbors = this.countNeighbors(
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

    public countNeighbors(cell: Coordinate, cells: boolean[][]): number {
        let neighborCount = 0;

        if (cell.row > 0 && cells[cell.row - 1][cell.col]) neighborCount++;
        if (
            cell.row < this.rows - 1 &&
            this.evolution.value.cells[cell.row + 1][cell.col]
        )
            neighborCount++;
        if (cell.col < this.cols - 1 && cells[cell.row][cell.col + 1])
            neighborCount++;
        if (cell.col > 0 && cells[cell.row][cell.col - 1]) neighborCount++;

        if (cell.row > 0 && cell.col > 0 && cells[cell.row - 1][cell.col - 1])
            neighborCount++;
        if (
            cell.row > 0 &&
            cell.col < this.cols - 1 &&
            cells[cell.row - 1][cell.col + 1]
        )
            neighborCount++;
        if (
            cell.row < this.rows - 1 &&
            cell.col > 0 &&
            cells[cell.row + 1][cell.col - 1]
        )
            neighborCount++;
        if (
            cell.row < this.rows - 1 &&
            cell.col < this.cols - 1 &&
            cells[cell.row + 1][cell.col + 1]
        )
            neighborCount++;

        return neighborCount;
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
                if (this.contains({ col: x, row: y }))
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
