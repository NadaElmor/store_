import { CartItem } from "./cart-item.model";

export interface CustomerBasket{
    id: string;
  items: CartItem[];
}