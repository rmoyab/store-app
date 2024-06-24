import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ageValidator } from '../../validators/age.validator';
import { confirmPasswordValidator } from '../../validators/password.validator';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  // users: any[] = [];
  // submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private el: ElementRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            // Validators.pattern(/^(?=.*\d)(?=.*[A-Z]).{6,18}$/),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            // Validators.pattern(/^(?=.*\d)(?=.*[A-Z]).{6,18}$/),
          ],
        ],
        birthDate: ['', [Validators.required, ageValidator(14)]],
        isAdmin: [false],
        address: [''],
      },
      {
        validator: confirmPasswordValidator,
      }
    );
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      const { email, password, username, birthDate } = this.registerForm.value;
      this.authService.registerUser(email, password, username, birthDate);
      this.router.navigate(['/home']);
    } else {
      // form validation errors
      this.markFormGroupTouched(this.registerForm);
    }
  }

  resetForm() {
    this.registerForm.reset({
      email: '',
      password: '',
      confirmPassword: '',
      isAdmin: false,
      address: '',
    });
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
