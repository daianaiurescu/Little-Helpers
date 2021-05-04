import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from './services/cartService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Little-Helpers';
  cartNumber = 0;
  constructor(private router: Router, private cartService: CartService) {
      this.cartService.cartSubject.subscribe(data => this.cartNumber = data);
  }

  ngOnInit(): void {
    this.cartNumberFunc();
  }
  goToLogInPage(): void{
    this.router.navigate(['login']);
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
