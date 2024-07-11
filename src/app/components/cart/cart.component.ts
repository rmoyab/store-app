import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ShippingOption } from '../../models/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, FontAwesomeModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart: any[];
  // total: number;
  totalDiscount: number;
  totalWithoutDiscount: number = 0;
  totalWithDiscount: number = 0;
  finalPrice: number = 0;
  shippingOptions: ShippingOption[] = [];
  selectedShippingIndex: number = 2;

  faPlus = faPlus;
  faMinus = faMinus;

  router = inject(Router);

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.cart = this.cartService.getCart();
    // this.total = this.cartService.getTotal();
    this.totalDiscount = this.cartService.getTotalDiscount();
  }

  ngOnInit(): void {
    // this.cart = this.cartService.getCart();
    this.shippingOptions = this.cartService.getShippingOptions() || [];
    this.updateTotals();
  }

  removeItem(index: number): void {
    this.cartService.removeItem(index);
    this.updateTotals();
  }

  increaseQuantity(index: number): void {
    if (this.cart[index].quantity === undefined) {
      this.cart[index].quantity = 1;
    } else {
      this.cart[index].quantity++;
    }
    this.updateTotals();
    this.cartService.saveCart();
  }

  decreaseQuantity(index: number): void {
    if (
      this.cart[index].quantity === undefined ||
      this.cart[index].quantity <= 1
    ) {
      this.cart[index].quantity = 1;
    } else {
      this.cart[index].quantity--;
    }
    this.updateTotals();
    this.cartService.saveCart();
  }

  // NO USED
  // updateQuantity(index: number, quantity: number): void {
  //   this.cart[index].quantity = quantity;
  //   this.calculateTotal();
  // }

  calculateItemTotal(item: any): number {
    return (item.price - item.price * item.discount) * item.quantity;
  }

  // calculateTotal(): void {
  //   this.total = this.cart.reduce(
  //     (acc, item) => acc + this.calculateItemTotal(item),
  //     0
  //   );
  // }

  getNumberOfItems(): number {
    return this.cartService.getNumberOfItems();
  }

  // getTotal(): number {
  //   return this.cartService.getTotal();
  // }

  clearCart(): void {
    this.cartService.clearCart();
    this.updateTotals();
    this.cart = [];
  }

  getTotalDiscount(): number {
    return this.cartService.getTotalDiscount();
  }

  goToGameDetail(productId: number) {
    this.router.navigate(['/product'], {
      queryParams: { id: productId },
    });
  }

  checkout(): void {
    alert('Thank you for your purchase!');
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }

  getShippingCost(): number {
    return this.cartService.getShippingCost();
  }

  updateShippingOption(index: number): void {
    this.selectedShippingIndex = index;
    this.cartService.updateSelectedShippingOption(index);
    this.updateTotals();
  }

  private updateTotals(): void {
    this.cartService.saveCart();
    this.totalWithoutDiscount = this.cartService.getTotalWithoutDiscount();
    this.totalWithDiscount = this.cartService.getTotalWithDiscount();
    this.finalPrice = this.cartService.getTotalWithDiscountAndShipping();
  }
}
