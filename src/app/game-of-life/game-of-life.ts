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

export function createSemiCircle(world: World, location: Coordinate) {
    world[location.col + 2][location.row - 3] = true;
    world[location.col + 1][location.row - 3] = true;
    world[location.col][location.row - 2] = true;
    world[location.col - 1][location.row - 1] = true;
    world[location.col - 1][location.row] = true;
    world[location.col - 1][location.row + 1] = true;
    world[location.col][location.row + 2] = true;
    world[location.col + 1][location.row + 3] = true;
    world[location.col + 2][location.row + 3] = true;
}

export function createSpaceShipLight(world: World, location: Coordinate) {
    world[location.col - 1][location.row + 1] = true;
    world[location.col][location.row - 1] = true;
    world[location.col][location.row + 1] = true;
    world[location.col + 1][location.row] = true;
    world[location.col + 1][location.row + 1] = true;
}

export function toggleCell(world: World, center: Coordinate) {
    world[center.col][center.row] = !world[center.col][center.row];
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
            if (neighbors == 2 || neighbors == 3) {
                newWorld[col][row] = world[col][row];
            }
            if (neighbors > 3) {
                newWorld[col][row] = false;
            }
            if (neighbors === 3) {
                newWorld[col][row] = true;
            }
        }
    }
    return newWorld;
}

export function countNeighbors(world: World, location: Coordinate): number {
    let neighbors = 0;
    const cols = world.length;
    const rows = world[0].length;

    if (location.col > 0 && world[location.col - 1][location.row]) neighbors++;
    if (location.col < cols - 1 && world[location.col + 1][location.row])
        neighbors++;
    if (location.row < rows - 1 && world[location.col][location.row + 1])
        neighbors++;
    if (location.row > 0 && world[location.col][location.row - 1]) neighbors++;

    if (
        location.col > 0 &&
        location.row > 0 &&
        world[location.col - 1][location.row - 1]
    )
        neighbors++;
    if (
        location.col > 0 &&
        location.row < rows - 1 &&
        world[location.col - 1][location.row + 1]
    )
        neighbors++;
    if (
        location.col < cols - 1 &&
        location.row > 0 &&
        world[location.col + 1][location.row - 1]
    )
        neighbors++;
    if (
        location.col < cols - 1 &&
        location.row < rows - 1 &&
        world[location.col + 1][location.row + 1]
    )
        neighbors++;

    return neighbors;
}
