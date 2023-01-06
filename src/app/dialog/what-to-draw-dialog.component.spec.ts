import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhatToDrawDialogComponent } from './what-to-draw-dialog.component';

describe('DialogComponent', () => {
    let component: WhatToDrawDialogComponent;
    let fixture: ComponentFixture<WhatToDrawDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WhatToDrawDialogComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WhatToDrawDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
