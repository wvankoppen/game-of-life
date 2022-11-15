import { MockBuilder, MockRender } from 'ng-mocks';
import { RendererModule } from './renderer.module';
import { RendererComponent } from './renderer.component';

describe('RendererComponent', () => {
    let component: RendererComponent;
    beforeEach(() => MockBuilder(RendererComponent, RendererModule));

    beforeEach(() => {
        component = MockRender(RendererComponent).point.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
