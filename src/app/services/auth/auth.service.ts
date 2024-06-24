import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: StorageService, private router: Router) {}

  registerUser(
    email: string,
    password: string,
    username: string,
    birthDate: string
  ): void {
    const users = this.getUsers();
    const newUser = { email, password, username, birthDate };
    users.push(newUser);
    this.storageService.setItem('users', users);
    this.loginUser(email, password);
  }

  loginUser(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      this.storageService.setItem('currentUser', user);
      return true;
    }
    return false;
  }

  logoutUser(): void {
    this.storageService.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): any {
    return this.storageService.getItem('currentUser');
  }

  updateProfile(updatedProfile: any): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updatedProfile };
      this.storageService.setItem('currentUser', updatedUser);
    }
  }

  isLoggedIn(): boolean {
    return !!this.storageService.getItem('currentUser');
  }

  private getUsers(): any[] {
    return this.storageService.getItem('users') || [];
  }
}
