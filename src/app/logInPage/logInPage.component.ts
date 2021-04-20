import {Component, OnInit} from '@angular/core';
import {User} from "../Models/User.interface";
import {UserService} from "../services/userService";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './logInPage.component.html',
  styleUrls: ['./logInPage.component.css']
})
export class LogInPageComponent implements OnInit{
  forgotPasswordPopupVisible: boolean;
  createAnAccountPopupVisible: boolean;
  newUser: User;
  users :User[];
  email:string;
  getAllUsersSubscription: Subscription;
  constructor(private userService: UserService) {
  }
  ngOnInit(): void {
    console.log(':)');
    this.getAllUsersSubscription = this.userService.getUsers().subscribe( response => {
      this.users = response;
    });
  }
  SignUp(firstName,lastName,email,password): void {


    const data = {
      firstName: firstName.value,
      lastName: lastName.value,
      emailAddress: email.value,
      password: password.value
    };
    console.log(data);
    this.userService.create(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

}
