import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGamepad, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../models/models';
import { ProductService } from '../../services/product/product.service';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, CommonModule, CartModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  router = inject(Router);

  faGamepad = faGamepad;
  faShoppingBasket = faShoppingBasket;

  constructor(
    private ProductService: ProductService,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.ProductService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  goToGameDetail(productId: number) {
    this.router.navigate(['/product'], {
      queryParams: { id: productId },
    });
  }
}
