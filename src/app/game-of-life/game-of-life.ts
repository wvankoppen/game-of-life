import { Coordinate } from './game-of-life.model';


export class World {
    private cells: boolean[][];

    constructor(cols: number, rows: number) {
        this.cells = new Array(cols)
            .fill(null)
            .map((_) => new Array(rows).fill(false));
    }

    public get cols() {
        return this.cells.length;
    }

    public get rows() {
        return this.cells[0].length;
    }

    public get livingCellCount() {
        return this.cells.reduce(
            (acc, cur) => cur.filter((c) => c).length + acc,
            0
        );
    }

    public toggle(cell: Coordinate) {
        this.cells[cell.col][cell.row] = !this.cells[cell.col][cell.row];
    }

    public add(figure: string, center: Coordinate) {
        const lines = figure.trim().split('\n');
        const offsetCol = Math.round(lines[0].length / 2);
        const offsetRow = Math.round(lines.length / 2);
        for (let col = 0; col < lines.length; col++) {
            for (let row = 0; row < lines[0].length; row++) {
                const x = col + center.col - offsetCol;
                const y = row + center.row - offsetRow;
                if (
                    this.cells[x] !== undefined &&
                    this.cells[x][y] !== undefined
                )
                    this.cells[x][y] = lines[col][row] === 'X';
            }
        }
    }

    public isAlive(cell: Coordinate): boolean {
        return this.cells[cell.col][cell.row];
    }

    public tick() {
        const cols = this.cells.length;
        const rows = this.cells[0].length;

        let newWorld: boolean[][] = [];
        for (let col = 0; col < cols; col++) {
            newWorld[col] = [];
            for (let row = 0; row < rows; row++) {
                const neighbors = this.countNeighbors({ col, row });
                if (neighbors < 2) {
                    newWorld[col][row] = false;
                }
                if (neighbors === 2) {
                    newWorld[col][row] = this.cells[col][row];
                }
                if (neighbors === 3) {
                    newWorld[col][row] = true;
                }
                if (neighbors > 3) {
                    newWorld[col][row] = false;
                }
            }
        }
        this.cells = newWorld;
    }

    public countNeighbors(cell: Coordinate): number {
        let neighborCount = 0;
        const cols = this.cells.length;
        const rows = this.cells[0].length;

        if (cell.col > 0 && this.cells[cell.col - 1][cell.row]) neighborCount++;
        if (cell.col < cols - 1 && this.cells[cell.col + 1][cell.row])
            neighborCount++;
        if (cell.row < rows - 1 && this.cells[cell.col][cell.row + 1])
            neighborCount++;
        if (cell.row > 0 && this.cells[cell.col][cell.row - 1]) neighborCount++;

        if (
            cell.col > 0 &&
            cell.row > 0 &&
            this.cells[cell.col - 1][cell.row - 1]
        )
            neighborCount++;
        if (
            cell.col > 0 &&
            cell.row < rows - 1 &&
            this.cells[cell.col - 1][cell.row + 1]
        )
            neighborCount++;
        if (
            cell.col < cols - 1 &&
            cell.row > 0 &&
            this.cells[cell.col + 1][cell.row - 1]
        )
            neighborCount++;
        if (
            cell.col < cols - 1 &&
            cell.row < rows - 1 &&
            this.cells[cell.col + 1][cell.row + 1]
        )
            neighborCount++;

        return neighborCount;
    }
}
