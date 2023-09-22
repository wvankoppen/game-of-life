import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `<app-game-of-life />`,
    styles: [
        `
            :host {
                display: block;
                height: 100%;
                margin: 0;
                padding: 0;
            }
        `,
    ],
})
export class AppComponent {}
