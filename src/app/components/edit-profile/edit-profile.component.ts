import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ageValidator } from '../../validators/age.validator';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/models';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required, ageValidator(14)]],
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser() || {};
    this.populateForm();
  }

  populateForm(): void {
    this.editForm.patchValue({
      username: this.user.username,
      email: this.user.email,
      birthDate: this.user.birthDate,
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedProfile = this.editForm.value;

      this.userService.getUserById(this.user.id).subscribe(
        (user: User | undefined) => {
          if (user) {
            user.username = updatedProfile.username;
            user.email = updatedProfile.email;
            user.birthDate = updatedProfile.birthDate;

            this.userService.updateUser(user).subscribe(
              () => {
                console.log('User updated successfully!');
                const { id, username, email, birthDate, isAdmin } = user;
                this.storageService.setItem('currentUser', {
                  id,
                  username,
                  email,
                  birthDate,
                  isAdmin,
                });
                this.router.navigate(['/profile']);
              },
              (error) => {
                console.error('Error updating user:', error);
              }
            );
          } else {
            console.error(`User with ID ${this.user.id} not found.`);
          }
        },
        (error) => {
          console.error('Error getting user by ID:', error);
        }
      );
    }
  }
}
