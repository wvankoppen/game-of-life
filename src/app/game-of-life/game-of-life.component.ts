import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-of-life',
  template: `
    <app-control></app-control>
    <app-game-of-life-render></app-game-of-life-render>`,
  styles: [``]
})
export class GameOfLifeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
