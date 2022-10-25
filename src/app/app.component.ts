import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `<app-game-of-life></app-game-of-life>`,
    styles: [
        `
            :host {
                display: block;
                height: 100%;
            }
        `,
    ],
})
export class AppComponent {}
