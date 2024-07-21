import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';

import { User } from '../../models/models';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.scss',
})
export class UserAdminComponent {
  users: User[] = [];
  currentUser: User | null = null;
  faTrash = faTrash;
  isAdminUser: boolean = false;
  user: User | any;
  userDelete: User | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private storageService: StorageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser() || {};

    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
    this.currentUser = this.authService.getCurrentUser();
  }

  passUserDelete(user: User): void {
    this.userDelete = user;
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(
      () => {
        console.log(`User ${user.username} deleted successfully.`);
        // Update the users list after deletion (optional)
        this.users = this.users.filter((u) => u.id !== user.id);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  editUser(user: User): void {
    //  this.router.navigate([`/edit-user/${user.id}`]);
    console.log('edit user:', user);
  }

  isAdmin(): boolean {
    if (this.storageService.getItem('currentUser') === null) {
      return false;
    }

    return this.storageService.getItem('currentUser').isAdmin;
  }

  updateAdminUser(user: User): void {
    this.userService.getUserById(user.id).subscribe(
      (user: User | undefined) => {
        if (user) {
          user.isAdmin = !user.isAdmin;
          this.userService.updateUser(user).subscribe(
            () => {
              console.log('User updated successfully!');
            },
            (error) => {
              console.error('Error updating user:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error getting user by ID:', error);
      }
    );
  }
}
