import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted:any = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.registerForm.invalid) {
    //   return;
    // } 
    let payload = {
      username: this.f['email'].value,
      password: this.f['password'].value
    }
    console.log(payload)
    this.authService.signup(payload)
    .subscribe({
      next: (response) => {
        // Handle successful login
        // this.authService.setAuthToken(response);
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
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
