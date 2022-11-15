import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-title',
    template: `
        <header>
            <h1>Game of Life</h1>
        </header>
    `,
    styles: [
        `
            header {
                position: fixed;
                width: 100%;
                text-align: center;
            }

            header h1 {
                font-size: 18pt;
                text-decoration: underline;
            }
        `,
    ],
})
export class TitleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
