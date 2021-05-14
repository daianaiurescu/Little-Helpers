import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../Models/Product.interface';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  }
)
export class ProductService{
  private apiUrl = environment.api;

  constructor(private httpClient: HttpClient){}
  // tslint:disable-next-line:typedef
  getProducts(){
    return this.httpClient.get<Array<Product>>(this.apiUrl + 'Products');
  }

  addProduct(data: any): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'SaveProduct', data);
  }
  // tslint:disable-next-line:typedef
  delete(data: any){
    return this.httpClient.delete(this.apiUrl + 'DeleteProduct/' + data.title).pipe(tap(() => {
    }));
  }
}
