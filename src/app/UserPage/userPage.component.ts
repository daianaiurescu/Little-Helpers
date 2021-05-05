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
    console.log(this.idUser);
    this.subscriptionUserService = this.userService.user
      .subscribe(user => {
        this.user = user;
      });
    console.log(this.user);
  }
  showInfo(): void{
    this.InfopopupVisible = true;
  }
  editInfo(): void{
    this.EditpopupVisible = true;
  }
  onLogout() {
    this.userService.logout();
  }
  save(firstName, lastName, email): void {

  }
}
