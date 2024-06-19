import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private dataUrl = 'assets/data.json'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  // Method to fetch categories
  getCategories(): Observable<any[]> {
    return this.http
      .get<any[]>(this.dataUrl)
      .pipe(catchError(this.handleError));
  }

  // Method to fetch products for a given category ID
  getProductsByCategoryId(categoryId: number): Observable<any[]> {
    return this.getCategories().pipe(
      catchError(this.handleError),
      map((categories) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.products : [];
      })
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error); // You can also return a user-facing error message here
  }
}
