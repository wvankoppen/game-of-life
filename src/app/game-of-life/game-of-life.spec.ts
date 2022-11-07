import { World } from './game-of-life';

describe('GameOfLife', () => {
    it('creates a world with correct size', () => {
        const world = new World(10, 20);
        expect(world.cols).toBe(10);
        expect(world.rows).toBe(20);
    });

    it('creates an empty world', () => {
        const world = new World(10, 20);
        expect(world.livingCellCount).toBe(0);
    });

    it('toggle a cell', () => {
        const world = new World(3, 3);
        const center = { col: 1, row: 1 };

        world.toggle(center);

        expect(world.livingCellCount).toBe(1);
    });
});
