import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

import { Product } from '../../models/models';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/auth/auth.service';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, FontAwesomeModule, CartModalComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Details for Product:';

  productId?: number;
  product?: Product | undefined;

  route = inject(ActivatedRoute);
  router = inject(Router);
  location = inject(Location);

  faShoppingBasket = faShoppingBasket;

  constructor(
    private ProductService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.productId = +params['id'];
      this.loadProduct();
    });
  }

  loadProduct(): void {
    if (this.productId) {
      this.ProductService.getProductById(this.productId).subscribe(
        (product: Product | undefined) => {
          this.product = product;
        },
        (error) => {
          console.error('Error fetching product:', error);
        }
      );
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  goBack() {
    this.location.back();
  }
}
