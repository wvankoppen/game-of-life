import { MockBuilder, MockRender } from 'ng-mocks';
import { GameOfLifeComponent } from './game-of-life.component';
import { GameOfLifeModule } from './game-of-life.module';

describe('GameOfLifeComponent', () => {
    let component: GameOfLifeComponent;
    beforeEach(() => MockBuilder(GameOfLifeComponent, GameOfLifeModule));

    beforeEach(() => {
        component = MockRender(GameOfLifeComponent).point.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
