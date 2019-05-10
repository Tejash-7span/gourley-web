import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-user-image',
    templateUrl: 'user-image.component.html'
})

export class UserImageComponent {
    @Input()
    imageSrc: string;
    constructor() { }
}
