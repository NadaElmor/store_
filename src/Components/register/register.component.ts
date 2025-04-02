import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  apiUrl = 'https://localhost:7091/api/account/register';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      displayName: ['', Validators.required],  
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]]
    });
  }

  register() {
    if (this.registerForm.valid) {
      const requestBody = {
        displayName: this.registerForm.value.displayName, 
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };

      this.http.post(this.apiUrl, requestBody).subscribe({
        next: (response) => {
          console.log(' Registration successful:', response);
          this.successMessage = "Registration successful! please login!";
            this.errorMessage = '';
            this.registerForm.reset(); 
        },
        error: (error) => {
          console.error(' Registration failed:', error);
          this.errorMessage = "Registration failed! Please try again.";
          this.successMessage = '';
        }
      });
    } else {
      console.log('⚠️ Form is invalid');
    }
  }
}
