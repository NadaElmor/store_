import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CartService } from '../../Services/cart.service';
import { CartItem } from '../../Models/cart-item.model';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../Services/create-order.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [OrderService],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent implements OnInit {
  orderForm: FormGroup;
  cartItems: CartItem[] = [];
  total: number = 0;
  isLoading = false;
  orderSuccess = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      paymentMethod: ['cash', Validators.required],
    });
  }

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotal();
      },
      error: (error) => {
        console.error('Error loading cart items:', error);
      },
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.isLoading = true;

      console.log('Form values:', this.orderForm.value);

      this.orderService.createOrder(this.orderForm.value).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.orderSuccess = true;
          localStorage.removeItem('basketId');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error details:', error);
          this.isLoading = false;

          if (error.error && error.error.message) {
            alert(`Error: ${error.error.message}`);
          } else {
            alert('Failed to create order. Please try again.');
          }
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
