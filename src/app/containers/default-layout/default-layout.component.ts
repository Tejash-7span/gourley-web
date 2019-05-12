import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { MessageService } from '../../general/services/message.service';
import { LocalStorageService } from '../../general/services/localstorage.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public name: string;
  public imageUrl: string;
  public copyRightYear: number = new Date().getFullYear();
  public imageSubscription: Subscription;
  constructor(private localStorageService: LocalStorageService, private messageService: MessageService, @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });

    this.imageSubscription = this.messageService.onImageUploaded.subscribe(event => {
      this.imageUrl = this.localStorageService.loggedInUser.imageUrl;
    });
  }

  ngOnInit() {
    this.name = this.localStorageService.loggedInUser.userName;
    this.imageUrl = this.localStorageService.loggedInUser.imageUrl;
  }


  ngOnDestroy(): void {
    this.changes.disconnect();
    this.imageSubscription.unsubscribe();
  }

  public logout() {
    this.messageService.sendLogoutMessage();
  }
}
