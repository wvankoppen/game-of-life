export interface Coordinate {
  col: number;
  row: number;
}

export type World = boolean[][];
export type Figure = 'cell' | 'semi-circle' | 'spaceship-light';
