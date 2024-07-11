import { faUserGear } from './../../../../../node_modules/@fortawesome/free-solid-svg-icons/faUserGear.d';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faShoppingBasket,
  faRightFromBracket,
  faUsersGear,
  faUser,
  faGear,
  faHome,
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../../services/auth/auth.service';
import { StorageService } from '../../../services/storage/storage.service';
import { CartService } from '../../../services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // @Input() pageTitle: string = 'Welcome!';
  cart: any[] = [];
  cartSubscription: Subscription = new Subscription();

  faShoppingBasket = faShoppingBasket;
  faRightFromBracket = faRightFromBracket;
  faUsersGear = faUsersGear;
  faUser = faUser;
  faGear = faGear;
  faHome = faHome;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();

    this.cartSubscription = this.cartService
      .getCartObservable()
      .subscribe((cart) => {
        this.cart = cart;
      });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getCurrentUser(): any {
    return this.authService.getCurrentUser();
  }

  isAdmin(): boolean {
    return this.storageService.getItem('currentUser').isAdmin;
  }

  logout() {
    this.authService.logoutUser();
  }
}
