import {Component, OnInit} from '@angular/core';
import {Product} from '../Models/Product.interface';
import {CartService} from '../services/cartService';
import {OrderService} from '../services/orderService';
import {Router} from '@angular/router';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css']
})

export class CartComponent implements OnInit {
  cartDetails: Product[];
  total: number;
  cartNumber = 0;
  clientDetailsPopup: boolean;

  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('localCart')) {
      this.cartDetails = JSON.parse(localStorage.getItem('localCart'));
    }
    this.loadCart();
    console.log(this.cartDetails);
  }

  loadCart(): any {
    if (localStorage.getItem('localCart')) {
      this.cartDetails = JSON.parse(localStorage.getItem('localCart'));
      // tslint:disable-next-line:only-arrow-functions typedef
      this.total = this.cartDetails.reduce(function(acc, val) {
        return acc + (val.price * val.quantity);
      }, 0);
    }
  }

  incQnt(prodId, qnt): void {
    for (let i = 0; i < this.cartDetails.length; i++) {
      if (this.cartDetails[i].id === prodId) {
        if (qnt <= this.cartDetails[i].stock) {
          this.cartDetails[i].quantity = parseInt(qnt) + 1;
        }
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.cartDetails));
    this.loadCart();
  }

  decQnt(prodId, qnt): void {
    for (let i = 0; i < this.cartDetails.length; i++) {
      if (this.cartDetails[i].id === prodId) {
        if (qnt !== 1) {
          this.cartDetails[i].quantity = parseInt(qnt) - 1;
        }
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.cartDetails));
    this.loadCart();
  }

  deleteProduct(cartDetail): void {
    if (localStorage.getItem('localCart')) {
      this.cartDetails = JSON.parse(localStorage.getItem('localCart'));
      for (let i = 0; i < this.cartDetails.length; i++) {
        if (this.cartDetails[i].id === cartDetail) {
          this.cartDetails.splice(i, 1);
          localStorage.setItem('localCart', JSON.stringify(this.cartDetails));
          this.loadCart();
          this.cartNumberFunc();
        }
      }
    }
  }

  cartNumberFunc(): void {
    const cartValue = JSON.parse(localStorage.getItem('localCart'));
    this.cartNumber = cartValue.length;
    this.cartService.cartSubject.next(this.cartNumber);
  }

  removeAll(): void {
    localStorage.removeItem('localCart');
    this.cartDetails = [];
    this.total = 0;
    this.cartNumber = 0;
    this.cartService.cartSubject.next(this.cartNumber);
  }

  placeOrder(fName, lName, email, phone, address): void {
    const data = {
      firstName: fName.value,
      lastName: lName.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
      total: this.total,
      products: this.cartDetails
    };
    console.log(data);
    this.orderService.addOrder(data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
    this.router.navigate(['shop']);
    this.clientDetailsPopup = false;
    delay(10000);
    this.removeAll();
  }

}
