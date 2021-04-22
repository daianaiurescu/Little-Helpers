import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Organisation} from "../Models/Organisation.interface";
import {User} from "../Models/User.interface";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
  }
)
export class UserService {

  private apiUrl = environment.api;

  constructor(private httpClient: HttpClient){}

  getUsers(){
    return this.httpClient.get<Array<User>>(this.apiUrl + 'Users');
  }
  getUser(id :any) {
    return this.httpClient.get<User>(this.apiUrl + 'User/'+ id);
  }
  create(data: any): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'Save', data);
  }
  signin(data: any):Observable<any> {
    return this.httpClient.post(this.apiUrl + 'Authenticate', data);
  }

}
