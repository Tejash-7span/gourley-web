import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { LoaderState } from '../models/loader.state.interface';
@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit, OnDestroy {
    show = false;
    private subscription: Subscription;
    constructor(private loaderService: LoaderService) { }
    ngOnInit() {
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
            });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
