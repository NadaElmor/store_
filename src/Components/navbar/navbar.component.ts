import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports:[RouterLinkActive, RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartCount: number = 0;
  menuOpen: boolean = false;
  isLoggedIn: boolean = false;
  constructor(private cartService: CartService,private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartCount = items.length; 
    });
    // Subscribe to authentication status
    this.authService.isAuthenticated$.subscribe(status => {
      this.isLoggedIn = status;
    });
    const token = localStorage.getItem('token');
    this.isLoggedIn = token !== null;
  }
  logout(): void {
    
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.authService.logout(); 
    this.router.navigate(['/home']); 
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
