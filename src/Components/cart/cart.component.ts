import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CartItem } from '../../Models/cart-item.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports:[CommonModule]
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>; 

  constructor(private cartService: CartService) {}

  ngOnInit() {
  
    this.cartItems$ = this.cartService.getCartItems();
  }

  removeItem(productId: number) {
    this.cartService.removeItem(productId).subscribe({
      error: (err) => alert('Cant delete: ' + err.message)
    });
  }
}