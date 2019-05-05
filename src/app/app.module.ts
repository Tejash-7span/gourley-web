import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './general/components/login.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { RestService } from './general/services/rest.service';
import { LocalStorageService } from './general/services/localstorage.service';
import { AuthenticationService } from './general/services/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './general/guards/auth.guard';
import { MessageService } from './general/services/message.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from './modules/shared/shared.module';
import { RegisterComponent } from './general/components/register.component';
import { UserService } from './modules/users/services/user.service';
import { JobTypeService } from './general/services/job-type.service';
import { PartService } from './general/services/part.service';
import { WorkerService } from './general/services/worker.service';
import { StatusService } from './general/services/status.service';
import { NgDatepickerModule } from 'ng2-datepicker';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule,
    ChartsModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
    RestService,
    LocalStorageService,
    AuthenticationService,
    AuthGuard,
    MessageService,
    UserService,
    JobTypeService,
    PartService,
    WorkerService,
    StatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
