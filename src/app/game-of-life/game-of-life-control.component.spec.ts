import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOfLifeControlComponent } from './game-of-life-control.component';

describe('GameOfLifeControlComponent', () => {
    let component: GameOfLifeControlComponent;
    let fixture: ComponentFixture<GameOfLifeControlComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GameOfLifeControlComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GameOfLifeControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
