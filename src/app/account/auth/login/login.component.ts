import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service'; // Update this path as necessary

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = '';

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, // Use AuthService instead of HttpClient
    private router: Router, 
    private toastr: ToastrService 
  ) { }

  ngOnInit() {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    // Use authService to submit login data
    this.authService.login(this.loginForm.value).subscribe(
      response => {
        const roles = response.roles;  // Correctly access roles
        // if(roles.includes("ROLE_USER")){
          console.log('API Response:', response.token); // Log the full response object
          localStorage.setItem('userId', response.userId.toString());
          localStorage.setItem('token', response.token);
          localStorage.setItem('fisrtName', response.fisrtName);
          localStorage.setItem('lastName', response.lastName);
          // Navigate to the 'demande' page and pass the user ID as a state or parameter
          this.router.navigate(['/account/Listdemande'], { queryParams: { userId: response.userId } });
          this.error = '';
        // }else{
        //   this.toastr.error("", 'UserName incorrect ', {
        //     positionClass: 'toast-top-center',
        //     timeOut: 3000,
        //     closeButton: true
        //   });
        // }
         // Clear any previous errors
      },
      error => {
        console.error('API Error:', error);
        let errorMessage = 'An error occurred. Please try again.'; // Default error message

        // Ensure you are displaying a meaningful error message
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.message && typeof error.message === 'string') {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }

        this.error = errorMessage; // Set the UI error message
        this.toastr.error(errorMessage, 'Login Failed', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          closeButton: true
        });
      }
    );
  }
}
