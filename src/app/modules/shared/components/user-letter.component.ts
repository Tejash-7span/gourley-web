import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-user-letter',
    templateUrl: 'user-letter.component.html'
})

export class UserLetterComponent implements OnInit {
    @Input()
    userName: string;

    letter: string;
    constructor() { }

    ngOnInit() {
        this.letter = this.userName.substr(0, 1).toUpperCase();
    }
}
