import {Component, OnInit} from '@angular/core';
import {User} from "../Models/User";
import {UserService} from "../services/userService";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './logInPage.component.html',
  styleUrls: ['./logInPage.component.css']
})
export class LogInPageComponent implements OnInit{
  forgotPasswordPopupVisible: boolean;
  createAnAccountPopupVisible: boolean;
  user: User;
  users :User[];
  email:string;
  getAllUsersSubscription: Subscription;
  errorSignUp: string;
  errorSignIn: string;
  errorSignUpFail: boolean = false;
  errorSignInFail: boolean = false;
  constructor(private userService: UserService, private router:Router) {
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
          this.errorSignUp = "Registration Complete";
          console.log("Good:"+response);
        },
        error => {
          this.errorSignUp =  error.error;
          this.errorSignUpFail = true;
          console.log("Bad"+error);
        });
  }
  SingIn(email,password): void {
    const data = {
      username : email.value,
      password : password.value
    };
    console.log(data);
     this.userService.signin(data)
       .subscribe(
         response => {
             console.log(response);
           this.user = response;
           this.userService.authHandler(this.user);
           console.log(this.user.id);
             this.router.navigate(['/userpage',this.user.id]);
         },
           error => {
             this.errorSignInFail = true;
             this.errorSignIn = "Invalid username/password";
             console.log(this.errorSignIn);
         });
  }

}
