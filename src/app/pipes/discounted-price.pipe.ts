import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'discountedPrice' })
export class DiscountedPricePipe implements PipeTransform {
  transform(price: number, discountPercentage?: number): number {
    if (!discountPercentage || discountPercentage <= 0) return price;
    return +(price * (1 - discountPercentage / 100)).toFixed(2);
  }
}
