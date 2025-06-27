import { Component, signal, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpProducts } from '../../services/http-products';
import { Card } from '../card/card';

@Component({
  selector: 'app-products-container',
  imports: [Card],
  templateUrl: './products-container.html',
  styleUrl: './products-container.scss',
})
export class ProductsContainer implements OnInit {
  data$!: Subscription;

  products = signal<any>([]);

  constructor(private http: HttpProducts) {}

  ngOnInit(): void {
    this.http.getProducts().subscribe({
      next: (data: any) => {
        this.products.set(data.products);
        console.log(this.products());
      },
      error: (error: any) => console.log('Failed to Load due to:', error),
    });
  }
}
