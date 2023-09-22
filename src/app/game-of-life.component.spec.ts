import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOfLifeComponent } from './game-of-life.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import {MatDialog} from "@angular/material/dialog";

describe('GameOfLifeComponent', () => {
    let component: GameOfLifeComponent;

    beforeEach(() => MockBuilder(GameOfLifeComponent ));

    beforeAll(() => {
        component = MockRender(GameOfLifeComponent).point.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
