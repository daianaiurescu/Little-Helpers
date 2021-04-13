import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Little-Helpers';
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('home');
  }
  goToLogInPage(): void{
    this.router.navigate(['login']);
  }
}
