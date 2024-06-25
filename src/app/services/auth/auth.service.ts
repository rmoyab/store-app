import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';

/**
 * @description
 * Service handling authentication-related operations.
 */

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: StorageService, private router: Router) {}

  /**
   * @description
   * Registers a new user.
   * @param email The email of the user.
   * @param password The password of the user.
   * @param username The username of the user.
   * @param birthDate The birthdate of the user.
   */

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

  /**
   * @description
   * Logs in a user with email and password.
   * @param email The email of the user.
   * @param password The password of the user.
   * @returns Returns true if login successful, otherwise false.
   */

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

  /**
   * @description
   * Logs out the current user by removing 'currentUser' from storage and navigating to '/login'.
   */

  logoutUser(): void {
    this.storageService.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  /**
   * @description
   * Retrieves the current user from storage.
   * @returns The current user object from storage.
   */

  getCurrentUser(): any {
    return this.storageService.getItem('currentUser');
  }

  /**
   * @description
   * Updates the current user's profile with new information.
   * @param updatedProfile The updated profile information to be applied.
   */

  updateProfile(updatedProfile: any): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updatedProfile };
      this.storageService.setItem('currentUser', updatedUser);
    }
  }

  /**
   * @description
   * Checks if a user is currently logged in.
   * @returns True if a user is logged in, false otherwise.
   */

  isLoggedIn(): boolean {
    return !!this.storageService.getItem('currentUser');
  }

  /**
   * @description
   * Retrieves the list of all users from storage.
   * @returns An array containing all user objects stored in 'users'.
   */

  private getUsers(): any[] {
    return this.storageService.getItem('users') || [];
  }
}
