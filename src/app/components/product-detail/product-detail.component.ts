import { Component, OnInit, inject } from '@angular/core';
import { Category, Product } from '../../models/models';
import { ActivatedRoute } from '@angular/router';
import { data } from '../../../data/products.json';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  productId?: number;
  product?: Product;

  route = inject(ActivatedRoute);

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
}
