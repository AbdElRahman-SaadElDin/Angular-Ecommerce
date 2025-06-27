import { Component, input } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { Router } from '@angular/router';
import { ProductItem } from '../../template/product-item';
import { CartItem } from '../../template/cart-item';
import { DiscountedPricePipe } from '../../pipes/discounted-price.pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [DiscountedPricePipe, NgClass],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  product = input<ProductItem>();
  discountedPrice: number = this.product()?.price ?? 0;

  constructor(private cartService: CartService, private router: Router) {}

  get stars() {
    return '★★★★★'.slice(0, Math.round(this.product()!.rating || 0));
  }

  addCart() {
    this.cartService.addToCart(this.product()!);
  }

  isInCart(): boolean {
    return (
      !!this.product &&
      this.cartService
        .cartItems()
        .some((pro: CartItem) => pro.id === this.product()!.id)
    );
  }
  goToDetails(id: number) {
    if (this.product() && id) {
      this.router.navigate(['/product', id]);
    } else {
      console.error('Product or product id is missing:', this.product());
    }
  }
}
