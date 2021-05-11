import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "./services/userService";
import {CartService} from './services/cartService';
import data from "devextreme";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Little-Helpers';
  cartNumber = 0;
  constructor(private userService: UserService, private router: Router, private cartService: CartService) {
      this.cartService.cartSubject.subscribe(data => typeof data === "number" ? this.cartNumber = data : data);
  }

  ngOnInit(): void {
    this.cartNumberFunc();
  }
  goToLogInPage(): void{
    if(!this.userService.user.getValue())
    this.router.navigate(['login']);
    else  this.router.navigate(['/userpage',this.userService.user.getValue().id]);
  }
  goToCart(): void{
    this.router.navigate(['cart']);
  }
  cartNumberFunc(): void {
    if
    (localStorage.getItem
    ('localCart') != null) {
      const cartCount = JSON.parse(localStorage.getItem('localCart'));
      this.cartNumber = cartCount.length;
    }
  }
}
