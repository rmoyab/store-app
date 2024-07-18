import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/auth/auth.service';

import { Product } from '../../models/models';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FontAwesomeModule, CartModalComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categoryId?: number;
  faShoppingBasket = faShoppingBasket;

  route = inject(ActivatedRoute);
  router = inject(Router);

  constructor(
    private ProductService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.categoryId = +params['id'];
      if (this.categoryId) {
        this.loadProducts();
      } else {
        console.error('Invalid categoryId:', params['id']);
      }
    });
  }

  loadProducts(): void {
    if (this.categoryId) {
      this.ProductService.getProductsByCategory(this.categoryId).subscribe(
        (products: Product[]) => {
          this.products = products;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    }
  }

  goToGameDetail(productId: number) {
    this.router.navigate(['/product'], {
      queryParams: { id: productId },
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
