import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Category } from '../../models/models';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  router = inject(Router);

  categories: Category[] = [];

  constructor(private ProductService: ProductService) {}

  ngOnInit(): void {
    this.ProductService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  goToGames(categoryId: number) {
    this.router.navigate(['/products'], {
      queryParams: { id: categoryId },
    });
  }
}
