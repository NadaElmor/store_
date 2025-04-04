import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../Models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'https://localhost:7091/api/orders';

  constructor(private http: HttpClient) {}

  createOrder(orderData: any): Observable<Order> {
    const basketId = localStorage.getItem('basketId');
    if (!basketId) {
      throw new Error('No basket found');
    }

    const order = {
      buyerEmail: 'user@example.com',
      basketId: basketId,
      deliveryMethodId: 0,
      shippingAddress: {
        id: 0,
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        street: orderData.address,
        city: orderData.city,
        country: orderData.country,
      },
    };

    console.log('Sending order with basketId:', basketId);
    return this.http.post<Order>(this.baseUrl, order, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
