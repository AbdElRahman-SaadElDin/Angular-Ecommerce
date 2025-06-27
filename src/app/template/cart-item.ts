export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  sku?: string;
  quantity: number;
  [key: string]: any;
  stock: number;
  discountPercentage: number;
}
