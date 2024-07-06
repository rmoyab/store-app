import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cart: any[];
  total: number;
  totalDiscount: number;

  constructor(private cartService: CartService) {
    this.cart = this.cartService.getCart();
    this.total = this.cartService.getTotal();
    this.totalDiscount = this.cartService.getTotalDiscount();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cart = [];
    this.total = 0;
  }
}
