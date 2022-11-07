import { MockBuilder, MockRender } from 'ng-mocks';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
    let component: AppComponent;
    beforeEach(() => MockBuilder(AppComponent, AppModule));

    beforeEach(() => {
        component = MockRender(AppComponent).point.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
