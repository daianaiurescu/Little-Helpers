import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "./services/userService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Little-Helpers';
  constructor(private userService: UserService,private router: Router ) {}

  ngOnInit(): void {
    console.log('home');
  }
  goToLogInPage(): void{
    if(!this.userService.user.getValue())
    this.router.navigate(['login']);
    else  this.router.navigate(['/userpage',this.userService.user.getValue().id]);
  }
}
