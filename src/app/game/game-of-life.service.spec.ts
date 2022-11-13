// describe('GameOfLife', () => {
//     it('creates a world with correct dimensions', () => {
//         const world = new World(1, 2);
//         expect(world.cols).toBe(1);
//         expect(world.rows).toBe(2);
//     });
//
//     it('creates an empty world', () => {
//         const world = new World(1, 2);
//         expect(world.livingCellCount).toBe(0);
//     });
//
//     it('toggles a cell', () => {
//         const world = new World(3, 3);
//         const center = { col: 1, row: 1 };
//
//         world.toggle(center);
//
//         expect(world.livingCellCount).toBe(1);
//     });
//
//     it('living cell dies', () => {
//         const world = new World(3, 3);
//         const center = { col: 1, row: 1 };
//
//         world.toggle(center);
//         world.evolve();
//
//         expect(world.livingCellCount).toBe(0);
//     });
// });
