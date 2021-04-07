import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {LogInPageComponent} from './logInPage/logInPage.component';
import {HomePageComponent} from './HomePage/HomePage.component';
import {DxiFieldModule} from 'devextreme-angular/ui/nested';
import {DxButtonModule, DxPopupModule, DxTextBoxModule} from 'devextreme-angular';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LogInPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LogInPageComponent,
    HomePageComponent
  ],
  imports: [
    DxTextBoxModule,
    DxiFieldModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    DxPopupModule,
    DxButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
