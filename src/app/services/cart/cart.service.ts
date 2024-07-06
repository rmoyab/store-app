import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = [];

  constructor(private storageService: StorageService) {
    this.loadCart();
  }

  private loadCart(): void {
    const cartData = this.storageService.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }

  getCart(): any[] {
    return this.cart;
  }

  addToCart(product: any): void {
    this.cart.push(product);
    this.saveCart();
  }

  private saveCart(): void {
    this.storageService.setItem('cart', this.cart);
  }

  getTotal(): number {
    let total = 0;
    this.cart.forEach((product) => {
      total += product.price * (1 - product.discount);
    });
    return total;
  }

  getTotalDiscount(): number {
    let totalDiscount = 0;
    this.cart.forEach((product) => {
      totalDiscount += product.price * product.discount;
    });
    return totalDiscount;
  }

  clearCart(): void {
    this.cart = [];
    this.storageService.removeItem('cart');
  }
}
