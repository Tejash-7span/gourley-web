import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { LoaderService } from './general/services/loader.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private loaderService: LoaderService) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loaderService.show();
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loaderService.hide();
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
