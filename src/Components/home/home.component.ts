import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../Models/iproduct';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalProduct: number = 0;
  searchTerm: string = '';

  constructor(private productService: ProductService) {

  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProductsPaginated(this.currentPage, this.pageSize, this.searchTerm).subscribe(response => {
      this.products = response.data;
      this.totalProduct = response.count;
      console.log(this.totalProduct);
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

}
