import {Component, OnInit} from '@angular/core';
import {User} from '../Models/User';
import {UserService} from '../services/userService';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './logInPage.component.html',
  styleUrls: ['./logInPage.component.css']
})
export class LogInPageComponent implements OnInit{
  forgotPasswordPopupVisible: boolean;
  createAnAccountPopupVisible: boolean;
  user: User;
  users: User[];
  email: string;
  getAllUsersSubscription: Subscription;
  errorSignUp: string;
  errorSignIn: string;
  errorSignUpFail = false;
  errorSignInFail = false;
  errorChangePassword: string;
  roles = ['user', 'organisation'];
  selectedRole: string;
  errorChangePasswordFail: boolean;
  constructor(private userService: UserService, private router: Router) {
  }
  ngOnInit(): void {
    this.getAllUsersSubscription = this.userService.getUsers().subscribe( response => {
      this.users = response;
    });

  }
  SignUp(firstName, lastName, email, password, role): void {

    const data = {
      firstName: firstName.value,
      lastName: lastName.value,
      emailAddress: email.value,
      password: password.value,
      role: role.value
    };
    this.userService.create(data)
      .subscribe(
        response => {
          this.errorSignUp = 'Registration Complete';
        },
        error => {
          if (error.error.text === undefined) {
          this.errorSignUp =  error.error;
          }
          else { this.errorSignUp = 'Registration complete'; }
          this.errorSignUpFail = true;
        });
  }
  SingIn(email, password): void {
    const data = {
      username : email.value,
      password : password.value
    };
    this.userService.signin(data)
       .subscribe(
         response => {
             this.user = response;
             this.userService.authHandler(this.user);
             if (this.user.role === 'user') {
               this.router.navigate(['/userpage', this.user.id]);
             }
             else{
               this.router.navigate(['/loggedOrganisation', this.user.id]);
             }
         },
           error => {
             this.errorSignInFail = true;
             this.errorSignIn = 'Invalid username/password';
         });
  }
  ChangePassword(email, password): void {
    const data = {
      username : email.value,
      password : password.value
    };
    this.userService.changePassword(data).subscribe(
          response => {
            console.log('Good' + response);
          },
          error => {
            this.errorChangePasswordFail = true;
            if (error.error.text === undefined) {
            this.errorChangePassword = error.error;
            }
            else { this.errorChangePassword = 'Changed password'; }
          }
    );
    console.log(this.errorChangePassword);
  }
  setUserRole($event): void{
    this.selectedRole = $event;
  }
}
