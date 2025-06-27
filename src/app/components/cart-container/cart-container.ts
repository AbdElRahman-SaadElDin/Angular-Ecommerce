import { Component } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { Router } from '@angular/router';
import { DiscountedPricePipe } from '../../pipes/discounted-price.pipe';

@Component({
  selector: 'app-cart-container',
  imports: [DiscountedPricePipe],
  templateUrl: './cart-container.html',
  styleUrl: './cart-container.scss',
})
export class CartContainer {
  constructor(public cartService: CartService, private router: Router) {}

  total() {
    return this.cartService.cartItems().reduce((acc, item) => {
      const discounted = new DiscountedPricePipe().transform(
        item.price,
        item.discountPercentage
      );
      return acc + discounted * item.quantity;
    }, 0);
  }

  goToDetails(id: number) {
    this.router.navigate(['/product', id]);
  }
}
