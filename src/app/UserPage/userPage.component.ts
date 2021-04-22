import {Component, OnInit} from "@angular/core";
import {User} from "../Models/User.interface";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {UserService} from "../services/userService";

@Component({
  selector: 'app-user-page',
  templateUrl: './userPage.component.html',
  styleUrls: ['./userPage.component.css']
})
export class userPageComponent implements OnInit{

  user : User;
  InfopopupVisible = false;
  EditpopupVisible = false;
  idUser : string = this.route.snapshot.paramMap.get('id');

  constructor(private userService: UserService , private route : ActivatedRoute) {}
  ngOnInit(): void {
    console.log(this.idUser);
    this.userService.getUser(this.idUser)
      .subscribe(
        response => {
          this.user = response;
          console.log(this.user);
        });
  }
  showInfo() :void{
    this.InfopopupVisible = true;
  }
  editInfo() :void{
    this.EditpopupVisible = true;
  }
  save(firstName,lastName,email) :void {

  }
}
