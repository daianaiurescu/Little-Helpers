import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {LogInPageComponent} from './logInPage/logInPage.component';
import {HomePageComponent} from './HomePage/HomePage.component';
import {DxiFieldModule} from 'devextreme-angular/ui/nested';
import {
  DxButtonModule,
  DxDateBoxModule,
  DxPopupModule,
  DxRadioGroupModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxTextBoxModule
} from 'devextreme-angular';
import {RouterModule, Routes} from '@angular/router';
import {OrganisationsPageComponent} from './OrganisationsPage/OrganisationsPage.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ShopPageComponent} from './Shop/ShopPage.component';
import {CartComponent} from './Shop/Cart.component';
import {UserPageComponent} from './UserPage/userPage.component';
import {AuthInterceptorService} from './services/authInterceptorService';
import {LoggedOrganisationComponent} from './OrganisationsPage/LoggedOrganisation.component';
//import { AngularFireModule } from '@angular/fire';
import {environment} from '../environments/environment';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LogInPageComponent},
  {path: 'organisations', component: OrganisationsPageComponent},
  {path: 'shop', component: ShopPageComponent},
  {path: 'cart', component: CartComponent},
  {path: 'userpage/:id', component: UserPageComponent},
  {path: 'loggedOrganisation/:id', component: LoggedOrganisationComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LogInPageComponent,
    HomePageComponent,
    OrganisationsPageComponent,
    ShopPageComponent,
    CartComponent,
    UserPageComponent,
    LoggedOrganisationComponent
  ],
  imports: [
    DxTextBoxModule,
    DxiFieldModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    DxPopupModule,
    DxButtonModule,
    DxDateBoxModule,
    HttpClientModule,
    DxSelectBoxModule,
    DxRadioGroupModule,
    DxScrollViewModule,
    //AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
