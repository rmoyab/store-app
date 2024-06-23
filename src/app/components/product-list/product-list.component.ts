import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Product } from '../../models/models';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categoryId?: number;

  route = inject(ActivatedRoute);
  router = inject(Router);

  constructor(private ProductService: ProductService) {}

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
}
