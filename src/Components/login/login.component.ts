import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private cdr: ChangeDetectorRef){

  }
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  
  login() {
    if (this.loginForm.invalid) return;
  
    const { email, password } = this.loginForm.value;
  
    if (!email || !password) {
      alert("Email and password are required!");
      return;
    }
  
    this.authService.login({ email, password }).subscribe({
      next: () =>{
        this.cdr.detectChanges();
         this.router.navigate(['/home'])
      },
      error: err => {
       this.errorMessage="Invalid email or password .. please try again"
      }
    });
  }
  
}
