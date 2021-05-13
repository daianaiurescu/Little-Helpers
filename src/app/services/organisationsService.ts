import {Organisation} from '../Models/Organisation.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Volunteer} from '../Models/Volunteer.interface';
import {tap} from 'rxjs/operators';

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
  // tslint:disable-next-line:typedef
  getVolunteers(){
    return this.httpClient.get<Array<Volunteer>>(this.apiUrl + 'GetVolunteers');
  }
   // tslint:disable-next-line:typedef
  getLoggedInOrganisation(title){
    return this.httpClient.get(this.apiUrl + 'Organisations/' + title);
  }

  addVolunteer(data: any): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'SaveVolunteer', data);
  }

  getVolunteer(data: any): Observable<any> {
    return this.httpClient.get(this.apiUrl + 'GetVolunteer', data);
  }

  // tslint:disable-next-line:typedef
  editDescription(data: any){
    console.log(data);
    return this.httpClient.post(this.apiUrl + 'ChangeOrganisationDetails', data);
  }
}
