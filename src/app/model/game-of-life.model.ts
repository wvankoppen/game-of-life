export interface Coordinate {
    col: number;
    row: number;
}
export interface Dimensions {
    cols: number;
    rows: number;
}

export const cell = `X`;
export const glider = `
-X-
--X
XXX
`;

export const block = `
XX
XX`;

export const pulsar = `
--XXX---XXX--
--------------
X----X X----X
X----X X----X
X----X X----X
--XXX---XXX--
-------------
--XXX---XXX--
X----X X----X
X----X X----X
X----X X----X
--------------
--XXX---XXX--`;

export const figures: { [key: string]: string } = {
    cell,
    glider,
    block,
    pulsar,
};

export interface World {
    cells: boolean[][];
    iteration: number;
}
