import { Coordinate } from '../model/game-of-life.model';

export function rows(cells: boolean[][]): number {
    return cells.length;
}

export function cols(cells: boolean[][]): number {
    return (cells[0] ?? []).length;
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
