import { MockBuilder, MockRender } from 'ng-mocks';
import { RendererComponent } from './renderer.component';

describe('RendererComponent', () => {
    let component: RendererComponent;
    beforeEach(() => MockBuilder(RendererComponent));

    beforeEach(() => {
        component = MockRender(RendererComponent).point.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
