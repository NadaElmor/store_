import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
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
  constructor(private cartService: CartService,private router: Router) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartCount = items.length; 
    });
    const token = localStorage.getItem('token');
    this.isLoggedIn = token !== null;
  }
  logout(): void {
   
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/home']); 
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
