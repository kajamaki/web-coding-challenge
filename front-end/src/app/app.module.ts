import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {NearbyShopsComponent} from './nearby-shops/nearby-shops.component';
import {PreferredShopsComponent} from './preferred-shops/preferred-shops.component';
import {HeaderComponent} from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    NearbyShopsComponent,
    PreferredShopsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
