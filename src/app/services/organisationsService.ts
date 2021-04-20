import {Organisation} from '../Models/Organisation.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
  }
)
export class OrganisationsService{
  private apiUrl = environment.api;

  constructor(private httpClient: HttpClient){}
  // tslint:disable-next-line:typedef
   getOrganisations(){
    return this.httpClient.get<Array<Organisation>>(this.apiUrl + 'Organisations');
  }

  addVolunteer(data: any): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'SaveVolunteer', data);
  }
}
