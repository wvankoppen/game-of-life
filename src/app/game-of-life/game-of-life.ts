export type World = boolean[][];
export type GolFigure = 'cell' | 'semi-circle' | 'spaceship-light';

export interface Coordinate {
    col: number;
    row: number;
}

export function createFigure(
    figure: GolFigure,
    world: World,
    location: Coordinate
) {
    switch (figure) {
        case 'cell':
            toggleCell(world, location);
            break;
        case 'semi-circle':
            createSemiCircle(world, location);
            break;
        case 'spaceship-light':
            createSpaceShipLight(world, location);
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

function countNeighbors(world: World, loc: Coordinate): number {
    let neighborCount = 0;
    const cols = world.length;
    const rows = world[0].length;

    if (loc.col > 0 && world[loc.col - 1][loc.row]) neighborCount++;
    if (loc.col < cols - 1 && world[loc.col + 1][loc.row]) neighborCount++;
    if (loc.row < rows - 1 && world[loc.col][loc.row + 1]) neighborCount++;
    if (loc.row > 0 && world[loc.col][loc.row - 1]) neighborCount++;

    if (loc.col > 0 && loc.row > 0 && world[loc.col - 1][loc.row - 1])
        neighborCount++;
    if (loc.col > 0 && loc.row < rows - 1 && world[loc.col - 1][loc.row + 1])
        neighborCount++;
    if (loc.col < cols - 1 && loc.row > 0 && world[loc.col + 1][loc.row - 1])
        neighborCount++;
    if (
        loc.col < cols - 1 &&
        loc.row < rows - 1 &&
        world[loc.col + 1][loc.row + 1]
    )
        neighborCount++;

    return neighborCount;
}
