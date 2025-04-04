export interface Order {
  id: number;
  buyerEmail: string;
  shippingAddress: Address;
  items: OrderItem[];
  deliveryMethod: string;
  deliveryMethodCost: number;
  status: string;
  orderDate: string;
  subTotal: number;
  total: number;
  paymentIntentId: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  country: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}
