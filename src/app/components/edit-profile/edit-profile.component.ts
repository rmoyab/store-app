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
      this.authService.updateProfile(updatedProfile);
      this.router.navigate(['/profile']);
    }
  }
}
