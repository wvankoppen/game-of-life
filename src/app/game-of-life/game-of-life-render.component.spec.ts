import { MockBuilder, MockRender } from 'ng-mocks';
import { GameOfLifeRenderComponent } from './game-of-life-render.component';
import { GameOfLifeModule } from './game-of-life.module';

describe('GameOfLifeComponent', () => {
    let component: GameOfLifeRenderComponent;
    beforeEach(() => MockBuilder(GameOfLifeRenderComponent, GameOfLifeModule));

    beforeEach(() => {
        component = MockRender(GameOfLifeRenderComponent).point.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
