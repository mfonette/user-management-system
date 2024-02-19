import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthSuccessResponse } from 'src/app/shared/models/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted:any = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // } 

    this.authService.login({email:this.f['email'].value, password: this.f['password'].value})
    .subscribe({
      next: (response) => {
        // Handle successful login
        this.authService.setAuthToken((response as AuthSuccessResponse).token);
        console.log('Login successful', (response as AuthSuccessResponse).token);
        this.router.navigate(['/admin']);
        // Redirect the user or update the UI as needed
      },
      error: (error) => {
        // Handle error
        console.error('Login failed', error);
      }
    });

    // this.authService.login(this.f['email'].value, this.f['password'].value)
    //       .pipe(first())
    //       .subscribe(
    //         data => {
    //           this.router.navigate(['/dashboard']);
    //         },
    //         error => {
    //           this.error = error; 
    //           console.log(this.error);
    //         });
  }

}
