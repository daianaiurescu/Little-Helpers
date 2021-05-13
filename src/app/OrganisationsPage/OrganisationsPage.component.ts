import {Component, OnInit} from '@angular/core';
import {Organisation} from '../Models/Organisation.interface';
import {OrganisationsService} from '../services/organisationsService';
import {Subscription} from 'rxjs';
import {UserService} from '../services/userService';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-organisations-page',
  templateUrl: './OrganisationsPage.component.html',
  styleUrls: ['./OrganisationsPage.component.css']
})
export class OrganisationsPageComponent implements OnInit{

  organisationPopupVisible: boolean;
  voluteeringPopupVisible: boolean;
  now: Date = new Date();
  organisations: Organisation[];
  getAllOrganisationsSubscription: Subscription;
  selectedOrganisation: Organisation;
  userFirstName = 'First name...';
  userLastName = 'Last name...';
  userEmailAddress = 'Email address...';
  errorMsg = '';
  errorMsgFail: boolean;
  constructor(private userService: UserService , private organisationsService: OrganisationsService,private datepipe: DatePipe) {
  }
   ngOnInit(): void {
     this.getAllOrganisationsSubscription = this.organisationsService.getOrganisations().subscribe( response => {
       this.organisations = response;
    });
     if (this.userService.user.getValue()) {
       this.userFirstName = this.userService.user.getValue().firstName;
       this.userLastName = this.userService.user.getValue().lastName;
       this.userEmailAddress = this.userService.user.getValue().emailAddress;
      }
   }
   getSelectedOrganisation(organisation): Organisation{
      this.selectedOrganisation = organisation;
      this.organisationPopupVisible = true;
      return this.selectedOrganisation;
   }
   saveVolunteer(fName, lName, bday, phone, email, desc): void{
     const data = {
       firstName: fName.value,
       lastName: lName.value,
       birthday: this.datepipe.transform(bday.value,'dd/MM/yyyy'),
       phone: phone.value,
       email: email.value,
       description: desc.value,
       applied_at: this.selectedOrganisation.title
     };
     console.log(fName);
    console.log(data);
    console.log(bday.valueAsDate);
     this.organisationsService.addVolunteer(data)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
            this.errorMsgFail = true;
            if (error.error.text === undefined) {
              this.errorMsg = error.error;
            }
            else { this.errorMsg = 'Saved'; }
        });
     //this.voluteeringPopupVisible = false;
    }
}
