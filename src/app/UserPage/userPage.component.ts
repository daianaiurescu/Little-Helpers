import {Component, OnInit} from '@angular/core';
import {User} from '../Models/User';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {UserService} from '../services/userService';
import {Subscription} from 'rxjs';
import {Organisation} from '../Models/Organisation.interface';
import {OrganisationsService} from '../services/organisationsService';
import {OrderService} from '../services/orderService';
import {Order} from '../Models/Order.interface';

@Component({
  selector: 'app-user-page',
  templateUrl: './userPage.component.html',
  styleUrls: ['./userPage.component.css']
})
export class UserPageComponent implements OnInit{

  user: User;
  InfopopupVisible = false;
  EditpopupVisible = false;
  ViewOrgVisible: boolean;
  failViewOrgVisible: boolean;
  organisations: Organisation[];
  getAllOrganisationsSubscription: Subscription;
  idUser: string = this.route.snapshot.paramMap.get('id');
  subscriptionUserService: Subscription;
  userOrders: Order[];
  userOrdersPopup: boolean;
  constructor(private userService: UserService , private organisationsService: OrganisationsService, private route: ActivatedRoute, private orderService: OrderService) {}
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
  viewOrg(): void {
    this.ViewOrgVisible = false;
    this.failViewOrgVisible = false;
    this.getAllOrganisationsSubscription = this.organisationsService.getOrganisationsForUser(this.user.emailAddress).subscribe(response => {
      this.organisations = response;
      if (this.organisations.length == 0) {
        this.failViewOrgVisible = true;
      }
      else {
        this.ViewOrgVisible = true;
      }
    });

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
  deleteOrganisation(organisation): void{
    this.organisationsService.deleteOrganisationForUser(this.user.emailAddress, organisation.title).subscribe(response => {
        console.log(response);
        this.viewOrg();
      },
      error => {
        console.log(error);
      });
  }
  viewOrders(): void{
    this.orderService.getOrders().subscribe(orders =>
     this.userOrders =  orders.filter(order => order.email === this.user.emailAddress )
    );
    this.userOrdersPopup = true;
  }
}
