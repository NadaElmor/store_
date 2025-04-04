import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../Services/product.service';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { IProduct } from './../../Models/iproduct';


@Component({
  selector: 'app-home',
  imports: [CommonModule, NgxPaginationModule, FormsModule],
 templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];

  currentPage: number = 1;
  pageSize: number = 5;
  totalProduct: number = 0;
  searchTerm: string = '';



  isLoading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}


  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProductsPaginated(this.currentPage, this.pageSize, this.searchTerm).subscribe(response => {
      this.products = response.data;
      this.totalProduct = response.count;
      console.log(this.totalProduct);
    });
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.isLoading = false;
      }
    });
  }
  
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  onSearch() {
    this.currentPage = 1;
    this.loadProducts();
  }
  addToCart(product: IProduct) {
    this.cartService.addToCart(product).subscribe({
      next: () => alert("Add to Cart"),
      error: (err) => {alert('Error: ' + err.message)
        console.log(err);
      }
    });
  }
}



