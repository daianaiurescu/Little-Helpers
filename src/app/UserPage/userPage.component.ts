import {Component, OnInit} from '@angular/core';
import {User} from '../Models/User';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {UserService} from '../services/userService';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './userPage.component.html',
  styleUrls: ['./userPage.component.css']
})
export class UserPageComponent implements OnInit{

  user: User;
  InfopopupVisible = false;
  EditpopupVisible = false;
  idUser: string = this.route.snapshot.paramMap.get('id');
  subscriptionUserService: Subscription;
  constructor(private userService: UserService , private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.subscriptionUserService = this.userService.user
      .subscribe(user => {
        this.user = user;
      });
  }
  showInfo(): void{
    this.InfopopupVisible = true;
  }
  editInfo(): void{
    this.EditpopupVisible = true;
  }
  onLogout(): void {
    this.userService.logout();
  }
  save(lastName, email): void {
    const data = {
      firstName: this.user.lastName,
      lastName: lastName.value,
      emailAddress: email.value
    };
    this.userService.editUserInfo(data).subscribe(
      response => {
        console.log('Good' + response);
        this.user.firstName = lastName.value;
        this.user.emailAddress = email.value;
      },
      error => {
        console.log('Bad' + error);
      }
    );
    this.EditpopupVisible = false;
  }
}
