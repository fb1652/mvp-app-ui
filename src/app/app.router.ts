import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {
  AboutComponent,
  BaseComponent,
  CatalogComponent,
  CreateAccountComponent,
  DatacentersComponent,
  DatacenterComponent,
  LoginComponent,
  ForgotPasswordComponent,
  StylesComponent,
  ReportsComponent,
  OfferingComponent,
  OfferingOverviewComponent,
  OfferingStepsComponent,
  ToolkitComponent
} from './components';
import {Offering} from './models';
import {ChangePasswordComponent} from "./components/changePassword/changePassword.component";

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'forgotPassword',
  component: ForgotPasswordComponent
}, {
  path: 'createAccount',
  component: CreateAccountComponent
},{
  path: 'changePassword',
  component: ChangePasswordComponent
},{
  path: '',
  component: BaseComponent,
  children: [{
    path: '',
    redirectTo: '/Catalog',
    pathMatch: 'full'
  }, {
    path: 'Catalog',
    component: CatalogComponent
  }, {
    path: 'Catalog/:offering',
    component: OfferingComponent,
    children: [{
      path: '',
      redirectTo: '/Catalog/:offering/Overview',
      pathMatch: 'full'
    }, {
      path: 'Overview',
      component: OfferingOverviewComponent
    }, {
      path: 'Steps',
      component: OfferingStepsComponent
    }]
  }, {
    path: 'Datacenters',
    component: DatacentersComponent
  }, {
    path: 'Datacenters/:datacenterId',
    component: DatacenterComponent
  }, {
    path: 'Reports',
    component: ReportsComponent
  }, {
    path: 'Toolkit',
    component: ToolkitComponent
  }, {
    path: 'About',
    component: AboutComponent
  }]
}, {
  path: 'styles',
  component: StylesComponent
}, {
  path: '**',
  redirectTo: '/Catalog',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouter {}
