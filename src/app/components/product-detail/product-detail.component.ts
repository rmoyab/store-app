import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from '../../models/models';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
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

  constructor(private ProductService: ProductService) {}

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

  goBack() {
    this.location.back();
  }
}
