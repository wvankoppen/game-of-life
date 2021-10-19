import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOfLifeWorldComponent } from './game-of-life.component';

describe('GameOfLifeComponent', () => {
    let component: GameOfLifeWorldComponent;
    let fixture: ComponentFixture<GameOfLifeWorldComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GameOfLifeWorldComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GameOfLifeWorldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
