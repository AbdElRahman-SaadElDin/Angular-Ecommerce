import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../template/cart-item';
import { ProductItem } from '../template/product-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  cartCount = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );

  addToCart(product: ProductItem) {
    const items = this.cartItems();
    const idx = items.findIndex((item) => item.id === product.id);
    if (idx > -1) {
      this.cartItems.set(items.filter((item) => item.id !== product.id));
    } else {
      this.cartItems.set([...items, { ...product, quantity: 1 }]);
    }
  }

  increaseQuantity(productId: number) {
    this.cartItems.update((items) => {
      const index = items.findIndex((item) => item.id === productId);
      if (index === -1) return items;
      const item = items[index];
      if (item.quantity >= item.stock) {
        alert('Cannot exceed available stock!');
        return items;
      }
      return items.map((cartItem, i) =>
        i === index
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    });
  }

  decreaseQuantity(productId: number) {
    this.cartItems.update((items) =>
      items
        .map((item) => {
          if (item.id === productId)
            return { ...item, quantity: item.quantity - 1 };
          else return item;
        })
        .filter((item) => item.quantity > 0)
    );
  }

  removeFromCart(productId: number) {
    this.cartItems.set(
      this.cartItems().filter((item) => item.id !== productId)
    );
  }
}
