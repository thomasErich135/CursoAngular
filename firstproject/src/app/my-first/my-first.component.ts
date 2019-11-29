import { Component } from "@angular/core";

@Component({
    selector: 'my-first-component',
    template: `
        <h1>Meu Primeiro Component com Angular 2!</h1>
    `,
    styles: [`
    h1 { 
        color: blue
    }
    
    `]
})
export class MyFirstComponent { }