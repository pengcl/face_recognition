import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutProComponent } from '@brand';
import { LayoutAuthComponent } from '../layout/auth/auth.component';
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

const routes: Routes = [
  {
    path: '',
    component: LayoutProComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      // Exception
      {
        path: 'exception',
        loadChildren: './exception/exception.module#ExceptionModule',
      },
      {
        path: 'alarm',
        children: [
          {
            path: 'list',
            component: AlarmListComponent,
          },
          {
            path: 'database',
            component: AlarmDatabaseComponent,
          },
        ],
      },
      {
        path: 'comparison',
        component: ComparisonComponent,
      },
      {
        path: 'passenger',
        children: [
          {
            path: 'list',
            component: PassengerListComponent,
          },
          {
            path: 'edit/:id',
            component: PassengerEditComponent,
          },
        ],
      },
    ],
  },
  // passport
  {
    path: 'auth',
    component: LayoutAuthComponent,
    children: [
      {
        path: 'login',
        component: AuthLoginComponent,
        data: { title: '登录', titleI18n: 'app.login.login' },
      },
      {
        path: 'register',
        component: AuthRegisterComponent,
        data: { title: '注册', titleI18n: 'app.register.register' },
      },
      {
        path: 'register-result',
        component: AuthRegisterResultComponent,
        data: { title: '注册结果', titleI18n: 'app.register.register' },
      },
      {
        path: 'lock',
        component: AuthLockComponent,
        data: { title: '锁屏', titleI18n: 'app.lock' },
      },
    ],
  },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule {
}
