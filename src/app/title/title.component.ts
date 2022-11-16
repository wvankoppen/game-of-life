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
                top: 20px;
                transform: translate(-50%, 0);
            }

            header h1 {
                font-size: 18pt;
                font-family: Courier;
                margin: 0;
                padding: 0;
              color: #666;
            }
        `,
    ],
})
export class TitleComponent {}
