import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../../models/models';
import { Observable } from 'rxjs';

/**
 * @description
 * Service handling authentication-related operations.
 */

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private userService: UserService
  ) {}

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
    birthDate: string,
    isAdmin: boolean
  ): void {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        const id = this.generateUniqueId(users);
        const newUser = { id, email, password, username, birthDate, isAdmin };
        users.push(newUser);
        const usersForSave = { data: { users } };
        this.userService.addUser(usersForSave).subscribe(
          () => {
            this.loginUser(email, password);
          },
          (error) => {
            console.error('Error at register:', error);
          }
        );

        // this.storageService.setItem('users', users);
      },
      (error) => {
        console.error('Error getting users:', error);
      }
    );
  }

  /**
   * @description
   * Logs in a user with email and password.
   * @param email The email of the user.
   * @param password The password of the user.
   * @returns Returns true if login successful, otherwise false.
   */

  loginUser(email: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.userService.getUsers().subscribe(
        (users: User[]) => {
          const user = users.find(
            (u) => u.email === email && u.password === password
          );
          if (user) {
            const { id, username, email, birthDate, isAdmin } = user;
            this.storageService.setItem('currentUser', {
              id,
              username,
              email,
              birthDate,
              isAdmin,
            });
            observer.next(true);
          } else {
            observer.next(false);
          }
          observer.complete();
        },
        (error) => {
          console.error('Error fetching users', error);
          observer.next(false);
          observer.complete();
        }
      );
    });
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

  getCurrentUser(): User | null {
    return (
      this.currentUser || this.storageService.getItem('currentUser') || null
    );
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

  private generateUniqueId(users: User[]): number {
    if (users.length > 0) {
      const maxId = Math.max(...users.map((user) => user.id));
      return maxId + 1;
    } else {
      return 1;
    }
  }
}
