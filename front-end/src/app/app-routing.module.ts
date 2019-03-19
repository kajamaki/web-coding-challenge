import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {NearbyShopsComponent} from './nearby-shops/nearby-shops.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {PreferredShopsComponent} from './preferred-shops/preferred-shops.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'nearby-shops',
    component: NearbyShopsComponent,
  },
  {
    path: 'preferred-shops',
    component: PreferredShopsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
