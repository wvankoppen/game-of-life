import { createNextGeneration, createWorld, toggleCell } from './game-of-life';
import { World } from './game-of-life.model';

describe('GameOfLife', () => {
    it('should create', () => {
        const world: World = createWorld(10, 20);
        expect(world.length).toBe(10);
        expect(world[0].length).toBe(20);
    });

    it('toggle a cell', () => {
        const world: World = createWorld(3, 3);
        const center = { col: 1, row: 1 };
        toggleCell(world, center);
        expect(world[1][1]).toBe(true);
    });
});
