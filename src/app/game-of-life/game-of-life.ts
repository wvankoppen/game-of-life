export type World = boolean[][];
export type Type =
    | 'cell'
    | 'glider'
    | 'spaceship-light'
    | 'spaceship-middle'
    | 'spaceship-heavy';

export function* gameOfLife(cols: number, rows: number): Generator<World> {
    function createNextGeneration(): World {
        let newWorld: World = [];
        for (let col = 0; col < cols; col++) {
            newWorld[col] = new Array(rows).fill(false);
            for (let row = 0; row < rows; row++) {
                const neighbors = countNeighbors(col, row);
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

    function countNeighbors(col: number, row: number): number {
        let neighbors = 0;

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
    function createFirstGeneration(cols: number, rows: number): World {
        return new Array(cols)
            .fill(null)
            .map((_) => new Array(rows).fill(false));
    }

    let world: World = createFirstGeneration(cols, rows);

    while (true) {
        const command: any = yield world;
        if (!command) world = createNextGeneration();
        else {
            if (command.creator === 'cell') {
                toggleCell(world, command.col, command.row);
            }
            if (command.creator === 'spaceship-light') {
                createSpaceShip(world, command.col, command.row);
            }
        }
    }
}

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
