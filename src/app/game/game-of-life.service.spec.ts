import { firstValueFrom } from 'rxjs';
import { GameOfLifeService } from './game-of-life.service';

describe('GameOfLifeService', () => {
    let sut: GameOfLifeService;

    beforeEach(() => {
        sut = new GameOfLifeService();
    });

    it('creates a world with correct dimensions', async () => {
        sut.resize(1, 2);
        const world = await firstValueFrom(sut.evolution$);
        expect(world.cells.length).toBe(1);
        expect(world.cells.length).toBe(2);
    });
});
