import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-frontend-client';
  isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkAuthentication();
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkAuthentication();
    })
  }

  checkAuthentication() {
    const token = localStorage.getItem('accessToken');
    this.isAuthenticated = !!token;

    if (this.isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }
}
