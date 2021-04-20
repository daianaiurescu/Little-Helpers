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

  create(data: any): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'Save', data);
  }

}
