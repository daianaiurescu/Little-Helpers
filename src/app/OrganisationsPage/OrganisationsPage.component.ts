import {Component, OnInit} from '@angular/core';
import {Organisation} from '../Models/Organisation.interface';
import {OrganisationsService} from '../services/organisationsService';
import {Subscription} from 'rxjs';

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
  constructor(private organisationsService: OrganisationsService) {
  }
   ngOnInit(): void {
     console.log(':)');
     this.getAllOrganisationsSubscription = this.organisationsService.getOrganisations().subscribe( response => {
       this.organisations = response;
    });
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
       birthday: bday.value,
       phone: phone.value,
       email: email.value,
       description: desc.value,
       applied_at: this.selectedOrganisation.title
     };
     this.organisationsService.addVolunteer(data)
       .subscribe(
         response => {
           console.log(response);
         },
         error => {
           console.log(error);
         });
   }
}
