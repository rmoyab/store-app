import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, ShippingOption } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<any[]>(this.cart);
  private shippingOptions: ShippingOption[] = [
    { label: 'Express', description: 'Same-day', cost: 10 },
    { label: 'Normal', description: 'Within 2 business days', cost: 5 },
    { label: 'Free', description: '5 business days', cost: 0 },
  ];
  private selectedShippingIndex: number = 2;

  constructor(private storageService: StorageService) {}

  getCart(): any[] {
    const cartData = this.storageService.getItem('cart');
    if (cartData) {
      this.cart = cartData;
      this.cartSubject.next(this.cart);
    }

    return this.cart || this.storageService.getItem('cart');
  }

  addToCart(product: any): void {
    const existingProduct = this.cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      this.cart.push(product);
      this.cartSubject.next(this.cart);
    }

    this.saveCart();
  }

  saveCart(): void {
    this.storageService.setItem('cart', this.cart);
  }

  // getTotal(): number {
  //   let total = 0;
  //   this.cart.forEach((product) => {
  //     total += product.price * (1 - product.discount) * product.quantity;
  //   });
  //   return total;
  // }

  getTotalWithoutDiscount(): number {
    let total = 0;
    this.cart.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  }

  getTotalWithDiscount(): number {
    return this.getTotalWithoutDiscount() - this.getTotalDiscount();
  }

  getTotalWithDiscountAndShipping(): number {
    let totalWithoutDiscount = this.getTotalWithoutDiscount();
    let totalDiscount = this.getTotalDiscount();
    let shippingCost = this.getSelectedShippingOption().cost;
    return totalWithoutDiscount - totalDiscount + shippingCost;
  }

  getTotalDiscount(): number {
    let totalDiscount = 0;
    this.cart.forEach((product) => {
      const discountAmount =
        product.price * product.discount * product.quantity;
      totalDiscount += discountAmount;
    });
    return totalDiscount;
  }

  getNumberOfItems(): number {
    let count = 0;
    this.cart.forEach((product) => {
      count += product.quantity;
    });
    return count;
  }

  clearCart(): void {
    this.cart = [];
    this.storageService.removeItem('cart');
    this.cartSubject.next(this.cart);
  }

  removeItem(index: number): void {
    this.cart.splice(index, 1);
    this.saveCart();
    this.cartSubject.next(this.cart);
  }

  updateQuantity(index: number, newQuantity: number): void {
    if (newQuantity > 0) {
      this.cart[index].quantity = newQuantity;
      this.saveCart();
    }
  }

  getCartObservable(): Observable<any[]> {
    return this.cartSubject.asObservable();
  }

  getShippingOptions(): ShippingOption[] {
    return this.shippingOptions;
  }

  getSelectedShippingOption(): ShippingOption {
    return this.shippingOptions[this.selectedShippingIndex];
  }

  updateSelectedShippingOption(index: number): void {
    this.selectedShippingIndex = index;
  }

  getShippingCost(): number {
    return this.getSelectedShippingOption().cost;
  }
}
