import { Coordinate } from './game-of-life.model';

export class World {
    private cells: boolean[][];
    private _iterations = 0;

    constructor(cols: number, rows: number) {
        this.cells = new Array(rows)
            .fill(null)
            .map((_) => new Array(cols).fill(false));
    }

    public get iterations(): number {
        return this._iterations;
    }

    public get rows(): number {
        return this.cells.length;
    }

    public get cols(): number {
        return this.cells[0].length;
    }

    public get livingCellCount(): number {
        return this.cells.reduce(
            (acc, cur) => cur.filter((c) => c).length + acc,
            0
        );
    }

    public toggle(cell: Coordinate) {
        this.cells[cell.row][cell.col] = !this.cells[cell.row][cell.col];
    }

    public draw(figure: string, center: Coordinate) {
        const rowData = figure.trim().split('\n');
        const rows = rowData.length;
        const cols = rowData[0].length;
        const offsetCol = Math.round(cols / 2);
        const offsetRow = Math.round(rows / 2);
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                const x = col + center.col - offsetCol;
                const y = row + center.row - offsetRow;
                if (
                    this.cells[y] !== undefined &&
                    this.cells[y][x] !== undefined
                )
                    this.cells[y][x] = rowData[row][col] === 'X';
            }
        }
    }

    public isAlive(cell: Coordinate): boolean {
        return this.cells[cell.row][cell.col];
    }

    public tick() {
        let newWorld: boolean[][] = [];
        for (let row = 0; row < this.rows; row++) {
            newWorld[row] = [];
            for (let col = 0; col < this.cols; col++) {
                const neighbors = this.countNeighbors({ col, row });
                if (neighbors < 2) {
                    newWorld[row][col] = false;
                }
                if (neighbors === 2) {
                    newWorld[row][col] = this.cells[row][col];
                }
                if (neighbors === 3) {
                    newWorld[row][col] = true;
                }
                if (neighbors > 3) {
                    newWorld[row][col] = false;
                }
            }
        }
        this.cells = newWorld;
        this._iterations++;
    }

    public countNeighbors(cell: Coordinate): number {
        let neighborCount = 0;

        if (cell.row > 0 && this.cells[cell.row - 1][cell.col]) neighborCount++;
        if (cell.row < this.rows - 1 && this.cells[cell.row + 1][cell.col])
            neighborCount++;
        if (cell.col < this.cols - 1 && this.cells[cell.row][cell.col + 1])
            neighborCount++;
        if (cell.col > 0 && this.cells[cell.row][cell.col - 1]) neighborCount++;

        if (
            cell.row > 0 &&
            cell.col > 0 &&
            this.cells[cell.row - 1][cell.col - 1]
        )
            neighborCount++;
        if (
            cell.row > 0 &&
            cell.col < this.cols - 1 &&
            this.cells[cell.row - 1][cell.col + 1]
        )
            neighborCount++;
        if (
            cell.row < this.rows - 1 &&
            cell.col > 0 &&
            this.cells[cell.row + 1][cell.col - 1]
        )
            neighborCount++;
        if (
            cell.row < this.rows - 1 &&
            cell.col < this.cols - 1 &&
            this.cells[cell.row + 1][cell.col + 1]
        )
            neighborCount++;

        return neighborCount;
    }
}
