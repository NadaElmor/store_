import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { CartItem } from '../Models/cart-item.model';
import { IProduct } from '../Models/iproduct';
import { CustomerBasket } from '../Models/CustomerBasket';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:7091/api/Basket';
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  constructor(private http: HttpClient) {}

  addToCart(product: IProduct): Observable<any> {
    let basketId = localStorage.getItem('basketId');
    if (!basketId) {
      basketId = Math.random().toString(36).substr(2, 9); 
      localStorage.setItem('basketId', basketId);
    }
   // Create a basket item
  const cartItem: CartItem = {
    productId: product.id,
    productName: product.name,
    price: product.price,
    quantity: 1,
    pictureUrl: product.pictureUrl,
    productBrandId: product.productBrandId,
    productTypeId: product.productTypeId,
    description: product.description,
    brand:product.name,
    category:product.name
  };

   // Create the basket object
  const basket = {
    id: basketId,
    items: [cartItem] 
  };

  // Send the request
  return this.http.post(this.apiUrl, basket).pipe(
    tap(() => {
      const currentItems = this.cartItems.value;
      const existingItem = currentItems.find(item => item.productId === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        currentItems.push(cartItem);
      }
      
      this.cartItems.next(currentItems);
    })
  );
  }

  getCartItems(): Observable<CartItem[]> {
    const basketId = localStorage.getItem('basketId');
    if (!basketId) {
      return new Observable<CartItem[]>(observer => {
        observer.next([]); 
        observer.complete();
      });
    }
  console.log(basketId);
  
    return this.http.get<CustomerBasket>(`${this.apiUrl}?Id=${basketId}`).pipe(
      map((basket) => basket.items || []) 
    );
  }
  

  removeItem(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`).pipe(
      tap(() => {
        const updatedItems = this.cartItems.value.filter(item => item.productId !== productId);
        this.cartItems.next(updatedItems);
      })
    );
  }
}