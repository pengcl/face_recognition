import { NgModule } from '@angular/core';
import { LayoutModule as CDKLayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedModule } from '@shared/shared.module';

import { PRO_ENTRYCOMPONENTS, PRO_COMPONENTS } from './pro/index';

// passport
import { LayoutAuthComponent } from './auth/auth.component';

const AUTH = [LayoutAuthComponent];

@NgModule({
  imports: [SharedModule, OverlayModule, CDKLayoutModule],
  entryComponents: PRO_ENTRYCOMPONENTS,
  declarations: [...PRO_COMPONENTS, ...AUTH],
  exports: [...PRO_COMPONENTS, ...AUTH],
})
export class LayoutModule {
}
