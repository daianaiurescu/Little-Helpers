import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './logInPage.component.html',
  styleUrls: ['./logInPage.component.css']
})
export class LogInPageComponent implements OnInit{
  forgotPasswordPopupVisible: boolean;
  createAnAccountPopupVisible: boolean;

  ngOnInit(): void {
  }
}
