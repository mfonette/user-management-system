import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user-management-system';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.handleAuthenticationRedirect();
  }

  handleAuthenticationRedirect() {
  // Bypass redirection if running Cypress tests
  if (localStorage.getItem('isTesting')) {
    return;
  }
  
    const currentRoute = this.router.url;

    // Assuming '/admin' and '/login' are the routes you want to check.
    if (currentRoute === '/' || currentRoute === '/login') {
      if (this.authService.isAuthenticated()) {
        // User is authenticated, redirect to admin/dashboard page.
        this.router.navigate(['/admin']);
      } else if (currentRoute !== '/login') {
        // User is not authenticated and not on the login page, redirect to login.
        this.router.navigate(['/login']);
      }
    }
  }
}
