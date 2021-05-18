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
import {OrderService} from '../services/orderService';
import {Order} from '../Models/Order.interface';

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
  orderedProducts: Product[];
  viewOrdersPopup: boolean;
  orders: Order[];

  constructor(private userService: UserService,
              private organisationsService: OrganisationsService,
              private productService: ProductService,
              private storage: AngularFireStorage,
              private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.subscriptionUserService = this.userService.user
      .subscribe(user => {
        this.organisation = user;
      });
    this.setLoggedOrganisation();
  }

  setLoggedOrganisation(): void{
    const title = this.organisation?.lastName + ' ' + this.organisation?.firstName;
    this.organisationSubscription = this.organisationsService.getLoggedInOrganisation(title).subscribe(response => {
      this.loggedOrganisation = response;
    });
  }
  logout(): void {
    this.userService.logout();
  }

  save(description): void {
    const data = {
      title: this.loggedOrganisation.title,
      description: description.value
    };
    this.organisationsService.editDescription(data).subscribe(
      response => {
        console.log('Good' + response);
        this.loggedOrganisation.description = description.value;
      },
      error => {
        console.log('Bad' + error);
      }
    );
    this.editInfoPopupVisible = false;
  }

  viewProducts(): void {
    this.getAllProductsSubscription = this.productService.getProducts().subscribe(response => {
      this.products = response.filter(product => product.sold_by === this.loggedOrganisation?.title);
    });
    this.productsPopupVisible = true;
  }

  deleteProduct(product): void{
    const data = {
      title: product.title
    };
    this.productService.delete(data).subscribe(response => {
      console.log(response);
      this.viewProducts();
    },
      error => {
        console.log(error);
      });
  }
  deleteVolunteer(volunteer): void{
    const data = {
      email: volunteer.email
    };
    this.organisationsService.deleteVolunteer(data).subscribe(response => {
        console.log(response);
        this.viewVolunteers();
      },
      error => {
        console.log(error);
      });
  }

  viewVolunteers(): void {
    this.getAllVolunteersSubscription = this.organisationsService.getVolunteers().subscribe(response =>
      this.volunteers = response.filter(volunteer => volunteer.applied_at === this.loggedOrganisation?.title));
    this.volunteersPopupVisible = true;
  }

  upload($event): void {
    this.selectedImage = $event.target.files[0];
    this.createRecord();
  }

  createRecord(): void {
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

  saveProduct(title, category, price, stock, description): void {
    const data = {
      title: title.value,
      category: category.value,
      sold_by: this.loggedOrganisation.title,
      price: price.value,
      stock: stock.value,
      description: description.value,
      photo: this.Image,
      quantity: 1
    };
    this.productService.addProduct(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
    this.addProductsPopupVisible = false;
  }
  // tslint:disable-next-line:typedef
  viewOrders(){
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
    this.viewOrdersPopup = true;
  }
}
