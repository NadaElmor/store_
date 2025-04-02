import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../Models/iproduct';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  products :IProduct[]=[];

  constructor(private productService:ProductService){
 
  }
 
  ngOnInit() {
    this.productService.getAllProducts().subscribe(response => {
      this.products = response.data;
      console.log(this.products);
      
    });
  }
}
