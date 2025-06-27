import { Component, OnInit } from '@angular/core';
import { HttpProducts } from '../../services/http-products';
import { ActivatedRoute } from '@angular/router';
import { ProductItem } from '../../template/product-item';
import { CartService } from '../../services/cart-service';
import { CartItem } from '../../template/cart-item';
import { DiscountedPricePipe } from '../../pipes/discounted-price.pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [DiscountedPricePipe, NgClass],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  product: ProductItem | null = null;

  constructor(
    private http: HttpProducts,
    private route: ActivatedRoute,
    public cartService: CartService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.http.getProducts().subscribe((data: any) => {
        this.product = data.products.find((p: ProductItem) => p.id === id);
        if (!this.product) {
          console.error('Product not found for id:', id);
        }
      });
    } else {
      console.error('No id param found in route');
    }
  }

  get stars() {
    return '★★★★★'.slice(0, Math.round(this.product?.rating || 0));
  }

  isInCart(): boolean {
    return (
      !!this.product &&
      this.cartService
        .cartItems()
        .some((item: CartItem) => item.id === this.product!.id)
    );
  }

  toggleCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }

  increaseQty() {
    if (this.product) {
      if (!this.isInCart()) {
        this.cartService.addToCart(this.product);
      } else {
        this.cartService.increaseQuantity(this.product.id);
      }
    }
  }

  decreaseQty() {
    if (this.product && this.isInCart()) {
      this.cartService.decreaseQuantity(this.product.id);
    }
  }

  getQty(): number {
    if (this.product) {
      const item = this.cartService
        .cartItems()
        .find((i) => i.id === this.product!.id);
      return item ? item.quantity : 0;
    }
    return 0;
  }
}
