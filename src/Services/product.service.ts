import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = "https://localhost:7091/api/products";

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<{ data: IProduct[] }>(this.apiUrl);
  }

  getAllProductsPaginated(pageIndex: number, pageSize: number, search:string = '') {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

      if (search.trim()) {
        params = params.set('search', search);
      }

    return this.http.get<{ data: IProduct[], count: number }>(this.apiUrl, { params });
  }
}
