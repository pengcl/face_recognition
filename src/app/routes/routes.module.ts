import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { AuthLoginComponent } from './auth/login/login.component';
import { AuthRegisterComponent } from './auth/register/register.component';
import { AuthRegisterResultComponent } from './auth/register-result/register-result.component';
import { AuthLockComponent } from './auth/lock/lock.component';

// alarm pages
import { AlarmListComponent } from './alarm/list/list.component';
import { AlarmDatabaseComponent } from './alarm/database/database.component';

// passenger pages
import { PassengerListComponent } from './passenger/list/list.component';
import { PassengerEditComponent } from './passenger/edit/edit.component';

// comparison pages
import { ComparisonComponent } from './comparison/comparison.component';
import { LayoutModule } from '../layout/layout.module';

const COMPONENTS = [
  DashboardComponent,
  // passport pages
  AuthLoginComponent,
  AuthRegisterComponent,
  AuthRegisterResultComponent,
  AuthLockComponent,
  // alarm pages
  AlarmListComponent,
  AlarmDatabaseComponent,
  // passenger pages
  PassengerListComponent,
  PassengerEditComponent,
  // Comparison pages
  ComparisonComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, RouteRoutingModule, LayoutModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {
}
