import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl="https://localhost:7091/api/products";

  constructor(private http :HttpClient) { }
  
  getAllProducts(){
    return this.http.get<{data:IProduct[]}>(this.apiUrl);
  }
}
