import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Category, Product } from '../../models/models';
import { environment } from '../../../environments/environment.development';

/**
 * Service responsible for handling product-related operations.
 */

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private dataUrl = 'http://localhost:4200/data/games.json';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.tokenFB}`,
    }),
  };

  private dataUrl = `${environment.urlFB}${environment.appName}games.json?alt=media`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves categories from the data source.
   * @returns An Observable array of Category objects.
   */

  getCategories(): Observable<any[]> {
    return this.http
      .get<{ data: { categories: Category[] } }>(this.dataUrl)
      .pipe(
        map((response) => response.data.categories),
        catchError(this.handleError)
      );
  }

  /**
   * Retrieves products belonging to a specific category.
   * @param categoryId The ID of the category for which products are fetched.
   * @returns An Observable array of Product objects.
   */

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

  /**
   * Retrieves a product by its ID.
   * @param productId The ID of the product to fetch.
   * @returns An Observable of the Product object if found, otherwise undefined.
   */

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

  /**
   * Handles HTTP errors.
   * @param error The error object received from the HTTP call.
   * @returns An Observable that emits the error.
   */

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
