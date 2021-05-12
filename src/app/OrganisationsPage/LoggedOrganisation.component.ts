import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../services/userService';
import {User} from '../Models/User';
import {OrganisationsService} from '../services/organisationsService';
import {ProductService} from '../services/productService';
import {Product} from '../Models/Product.interface';
import {Volunteer} from '../Models/Volunteer.interface';
import {finalize, map, take, tap} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-logged-organisation',
  templateUrl: './LoggedOrganisation.component.html',
  styleUrls: ['./LoggedOrganisation.component.css']
})
export class LoggedOrganisationComponent implements OnInit {
  subscriptionUserService: Subscription;
  organisation: User;
  infoPopupVisible = false;
  loggedOrganisation: any;
  organisationSubscription: Subscription;
  editInfoPopupVisible = false;
  products: Product[];
  productsPopupVisible = false;
  private getAllProductsSubscription: Subscription;
  volunteersPopupVisible = false;
  private getAllVolunteersSubscription: Subscription;
  volunteers: Volunteer[];
  addProductsPopupVisible = false;
  selectedImage: string;
  Image: string;
  constructor(private userService: UserService,
              private organisationsService: OrganisationsService,
              private productService: ProductService,
              private storage: AngularFireStorage
              ) {
  }
  ngOnInit(): void {
    this.subscriptionUserService = this.userService.user
      .subscribe(user => {
        this.organisation = user;
      });
    const title = this.organisation?.lastName + ' ' + this.organisation?.firstName;
    this.organisationSubscription = this.organisationsService.getLoggedInOrganisation(title).subscribe( response => {
      this.loggedOrganisation = response;
    });
  }
  logout(): void{
    this.userService.logout();
  }
  save(title, description): void{
    this.loggedOrganisation.title = title;
    this.loggedOrganisation.description = description;
  }
  viewProducts(): void{
    this.getAllProductsSubscription = this.productService.getProducts().subscribe(response => {
      this.products = response.filter(product => product.sold_by === this.loggedOrganisation?.title);
    });
    this.productsPopupVisible = true;
  }
  viewVolunteers(): void{
    this.getAllVolunteersSubscription = this.organisationsService.getVolunteers().subscribe(response =>
      this.volunteers = response.filter(volunteer => volunteer.applied_at === this.loggedOrganisation?.title));
    this.volunteersPopupVisible = true;
  }
  // deleteVolunteer(volunteer: Volunteer): void{
  //   console.log('aa');
  //   this.organisationsService.deleteVolunteer(volunteer);
  // }
  upload($event): void{
    this.selectedImage = $event.target.files[0];
  }
  createRecord(): void{
    // tslint:disable-next-line:prefer-const
    let filePath = `/files/_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.Image = url;
        });
      })
    ).subscribe();
  }
  saveProduct(title, category, price, stock, description): void{
    const data = {
      title: title.value,
      category: category.value,
      sold_by: this.loggedOrganisation,
      price: price.value,
      stock: stock.value,
      description: description.value,
      photo: this.Image,
      quantity: 1
    };
    console.log(data);
   //  this.productService.addProduct(data);
  }
}
