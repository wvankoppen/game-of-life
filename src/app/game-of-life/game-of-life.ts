export type World = boolean[][];
export type GolFigure =
    | 'cell'
    | 'glider'
    | 'spaceship-light'
    | 'spaceship-middle'
    | 'spaceship-heavy';

export function createSpaceShip(world: World, x: number, y: number) {
    world[x + 2][y - 3] = true;
    world[x + 1][y - 3] = true;
    world[x][y - 2] = true;
    world[x - 1][y - 1] = true;
    world[x - 1][y] = true;
    world[x - 1][y + 1] = true;
    world[x][y + 2] = true;
    world[x + 1][y + 3] = true;
    world[x + 2][y + 3] = true;
}

export function toggleCell(world: World, col: number, row: number) {
    world[col][row] = !world[col][row];
}

export function createNextGeneration(world: World): World {
    const cols = world.length;
    const rows = world[0].length;

    let newWorld: boolean[][] = [];
    for (let col = 0; col < cols; col++) {
        newWorld[col] = [];
        for (let row = 0; row < rows; row++) {
            const neighbors = countNeighbors(world, col, row);
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

export function countNeighbors(world: World, col: number, row: number): number {
    let neighbors = 0;
    const cols = world.length;
    const rows = world[0].length;

    if (col > 0 && world[col - 1][row]) neighbors++;
    if (col < cols - 1 && world[col + 1][row]) neighbors++;
    if (row < rows - 1 && world[col][row + 1]) neighbors++;
    if (row > 0 && world[col][row - 1]) neighbors++;

    if (col > 0 && row > 0 && world[col - 1][row - 1]) neighbors++;
    if (col > 0 && row < rows - 1 && world[col - 1][row + 1]) neighbors++;
    if (col < cols - 1 && row > 0 && world[col + 1][row - 1]) neighbors++;
    if (col < cols - 1 && row < rows - 1 && world[col + 1][row + 1])
        neighbors++;

    return neighbors;
}
