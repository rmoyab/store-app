import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() pageTitle: string = 'Welcome, to Dice Heaven!';

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getCurrentUser(): any {
    return this.authService.getCurrentUser();
  }

  isAdmin(): boolean {
    return this.storageService.getItem('currentUser').isAdmin;
  }

  logout() {
    this.authService.logoutUser();
  }
}
