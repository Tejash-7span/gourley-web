import { Component, OnInit, Input, Renderer2, ElementRef, OnChanges } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-user-image',
    templateUrl: 'user-image.component.html'
})

export class UserImageComponent implements OnChanges {
    private apiURL = environment.apiUrl;
    @Input()
    imageUrl: string;

    @Input()
    background = false;

    private src;
    private defaultImage = 'assets/img/avatars/default_image.png';
    constructor(private element: ElementRef, private renderer: Renderer2) { }

    ngOnChanges() {
        this.src = null;
        if (this.background) {
            if (this.imageUrl) {
                const src = `${this.apiURL}/users/image/${this.imageUrl}?t=${new Date().getTime()}`;
                this.renderer.setStyle(this.element.nativeElement, 'background-image', `url(${src})`);
            } else {
                this.renderer.setStyle(this.element.nativeElement, 'background-image', `url(${this.defaultImage})`);
            }
        } else {
            if (this.imageUrl) {
                this.src = `${this.apiURL}/users/image/${this.imageUrl}?t=${new Date().getTime()}`;
            } else {
                this.src = `${this.defaultImage}`;
            }
        }
    }
}
