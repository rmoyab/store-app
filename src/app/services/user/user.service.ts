import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { User } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dataUrl = 'http://localhost:4200/data/users.json';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.dataUrl}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.dataUrl}/${id}`);
  }
}
