interface AddItemsResponse {
  id: string;
  items: CartItem[];
  cartTotal: number;
}

interface CartItem {
  name: string;
  price: number;
  qty: number;
}
