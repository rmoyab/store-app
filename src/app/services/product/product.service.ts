import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Category, Product } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private dataUrl = 'http://localhost:4200/data/products.json';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    return this.http
      .get<{ data: { categories: Category[] } }>(this.dataUrl)
      .pipe(
        map((response) => response.data.categories), // Access categories array
        catchError(this.handleError)
      );
  }

  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http
      .get<{ data: { categories: Category[] } }>(this.dataUrl)
      .pipe(
        map((response) => {
          const category = response.data.categories.find(
            (c) => c.id === categoryId
          );
          return category ? category.games : [];
        }),
        catchError(this.handleError)
      );
  }

  getProductById(productId: number): Observable<Product | undefined> {
    return this.http
      .get<{ data: { categories: Category[] } }>(this.dataUrl)
      .pipe(
        map((response) => {
          let product: Product | undefined;
          response.data.categories.forEach((category) => {
            const foundProduct = category.games.find((p) => p.id === productId);
            if (foundProduct) {
              product = foundProduct;
            }
          });
          return product;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
