import { Coordinate, Figure, World } from "./game-of-life.model";

export function createFigure(
    figure: Figure,
    world: World,
    cell: Coordinate
) {
    switch (figure) {
        case 'cell':
            toggleCell(world, cell);
            break;
        case 'semi-circle':
            createSemiCircle(world, cell);
            break;
        case 'spaceship-light':
            createSpaceShipLight(world, cell);
            break;
    }
}

export function createSemiCircle(world: World, cell: Coordinate) {
    world[cell.col + 2][cell.row - 3] = true;
    world[cell.col + 1][cell.row - 3] = true;
    world[cell.col + 0][cell.row - 2] = true;
    world[cell.col - 1][cell.row - 1] = true;
    world[cell.col - 1][cell.row + 0] = true;
    world[cell.col - 1][cell.row + 1] = true;
    world[cell.col + 0][cell.row + 2] = true;
    world[cell.col + 1][cell.row + 3] = true;
    world[cell.col + 2][cell.row + 3] = true;
}

export function createSpaceShipLight(world: World, location: Coordinate) {
    world[location.col - 1][location.row + 1] = true;
    world[location.col + 0][location.row - 1] = true;
    world[location.col + 0][location.row + 1] = true;
    world[location.col + 1][location.row + 0] = true;
    world[location.col + 1][location.row + 1] = true;
}

export function toggleCell(world: World, cell: Coordinate) {
    world[cell.col][cell.row] = !world[cell.col][cell.row];
}

export function createNextGeneration(world: World): World {
    const cols = world.length;
    const rows = world[0].length;

    let newWorld: boolean[][] = [];
    for (let col = 0; col < cols; col++) {
        newWorld[col] = [];
        for (let row = 0; row < rows; row++) {
            const neighbors = countNeighbors(world, { col, row });
            if (neighbors < 2) {
                newWorld[col][row] = false;
            }
            if (neighbors === 2) {
                newWorld[col][row] = world[col][row];
            }
            if (neighbors === 3) {
                newWorld[col][row] = true;
            }
            if (neighbors > 3) {
                newWorld[col][row] = false;
            }
        }
    }
    return newWorld;
}

function countNeighbors(world: World, cell: Coordinate): number {
    let neighborCount = 0;
    const cols = world.length;
    const rows = world[0].length;

    if (cell.col > 0 && world[cell.col - 1][cell.row]) neighborCount++;
    if (cell.col < cols - 1 && world[cell.col + 1][cell.row]) neighborCount++;
    if (cell.row < rows - 1 && world[cell.col][cell.row + 1]) neighborCount++;
    if (cell.row > 0 && world[cell.col][cell.row - 1]) neighborCount++;

    if (cell.col > 0 && cell.row > 0 && world[cell.col - 1][cell.row - 1])
        neighborCount++;
    if (cell.col > 0 && cell.row < rows - 1 && world[cell.col - 1][cell.row + 1])
        neighborCount++;
    if (cell.col < cols - 1 && cell.row > 0 && world[cell.col + 1][cell.row - 1])
        neighborCount++;
    if (
        cell.col < cols - 1 &&
        cell.row < rows - 1 &&
        world[cell.col + 1][cell.row + 1]
    )
        neighborCount++;

    return neighborCount;
}
