import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Ng2Webstorage} from 'ngx-webstorage';

import {AppRouter} from './app.router';
import {AppInterceptor} from './app.interceptor';
import {MaterialModule} from './material.module';

import {
  AppComponent,
  AboutComponent,
  BannerComponent,
  BaseComponent,
  CapacityComponent,
  CatalogComponent,
  ChangePasswordComponent,
  CreateAccountComponent,
  DatacenterAddDialog,
  DatacentersListDialog,
  DatacentersListComponent,
  DatacentersComponent,
  DatacenterComponent,
  DatacenterUserAddDialog,
  DatacenterUsersComponent,
  ForgotPasswordComponent,
  HardwareComponent,
  HardwareViewComponent,
  HealthchecktableComponent,
  HealthcheckComponent,
  HealthcheckExceptionComponent,
  LoginComponent,
  OfferingComponent,
  OfferingOverviewComponent,
  OfferingsComponent,
  OfferingStepsComponent,
  ReportsComponent,
  ScanComponent,
  SortFilterTableComponent,
  SoftwareComponent,
  SoftwareStandardizationComponent,
  SoftwareViewComponent,
  SpecialtyProcessorsComponent,
  SpinnerComponent,
  StylesComponent,
  TopologyComponent,
  ToolkitComponent
} from './components';

import {
  ConfigService,
  DataService,
  DatacenterService,
  HealthcheckService,
  OfferingsService,
  ReportService,
  SocketService,
  SortTableService,
  UserService,
} from './services';

import {FileUploadModule, OrganizationChartModule} from 'primeng/primeng';
import {HelpService} from './services/help/help.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BannerComponent,
    BaseComponent,
    CapacityComponent,
    CatalogComponent,
    ChangePasswordComponent,
    CreateAccountComponent,
    DatacenterAddDialog,
    DatacentersListDialog,
    DatacentersListComponent,
    DatacenterComponent,
    DatacentersComponent,
    DatacenterUserAddDialog,
    DatacenterUsersComponent,
    ForgotPasswordComponent,
    HardwareComponent,
    HardwareViewComponent,
    HealthchecktableComponent,
    HealthcheckComponent,
    HealthcheckExceptionComponent,
    LoginComponent,
    OfferingComponent,
    OfferingOverviewComponent,
    OfferingsComponent,
    OfferingStepsComponent,
    ReportsComponent,
    ScanComponent,
    SoftwareComponent,
    SoftwareStandardizationComponent,
    SoftwareViewComponent,
    SortFilterTableComponent,
    SpecialtyProcessorsComponent,
    SpinnerComponent,
    StylesComponent,
    ToolkitComponent,
    TopologyComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true},
    ConfigService,
    DataService,
    DatacenterService,
    HealthcheckService,
    HelpService,
    OfferingsService,
    ReportService,
    SocketService,
    SortTableService,
    UserService,
  ],
  entryComponents: [DatacenterAddDialog, DatacentersListDialog, DatacenterUserAddDialog],
  imports: [
    AppRouter,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    Ng2Webstorage,
    ReactiveFormsModule,
    OrganizationChartModule,
    FileUploadModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
