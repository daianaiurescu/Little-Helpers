import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../Models/Order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService{
  private apiUrl = environment.api;

  constructor(private httpClient: HttpClient){}
  // tslint:disable-next-line:typedef
  getOrders(){
    return this.httpClient.get<Array<Order>>(this.apiUrl + 'Orders');
  }

  addOrder(data: any): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'PlaceOrder', data);
  }
}
