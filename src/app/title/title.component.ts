import { Component } from '@angular/core';

@Component({
    selector: 'app-title',
    template: `
        <header>
            <h1>[Game of Life]</h1>
        </header>
    `,
    styles: [
        `
            header {
                position: fixed;
                left: 50%;
                transform: translate(-50%, 0);
                font-family: Courier;
                color: #666;
            }

            header h1 {
                font-size: 18pt;
            }
        `,
    ],
})
export class TitleComponent {}
