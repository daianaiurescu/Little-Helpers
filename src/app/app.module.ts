import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {LogInPageComponent} from './logInPage/logInPage.component';
import {HomePageComponent} from './HomePage/HomePage.component';
import {DxiFieldModule} from 'devextreme-angular/ui/nested';
import {DxButtonModule, DxDateBoxModule, DxPopupModule, DxTextBoxModule} from 'devextreme-angular';
import {RouterModule, Routes} from '@angular/router';
import {OrganisationsPageComponent} from './OrganisationsPage/OrganisationsPage.component';
import {userPageComponent} from "./UserPage/userPage.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptorService} from "./services/authInterceptorService";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LogInPageComponent},
  {path: 'organisations', component: OrganisationsPageComponent},
  {path: 'userpage/:id',component: userPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LogInPageComponent,
    HomePageComponent,
    OrganisationsPageComponent,
    userPageComponent
  ],
  imports: [
    DxTextBoxModule,
    DxiFieldModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    DxPopupModule,
    DxButtonModule,
    DxDateBoxModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
