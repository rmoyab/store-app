import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;
  let formBuilder: FormBuilder;

  const mockActivatedRoute = {
    queryParams: { id: 1 },
  };

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'registerUser',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
        ]),
      ],
      providers: [
        UserService,
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('>>>>>>>>>>>>>>>>>> should mark form as touched when form is invalid', () => {
    spyOn(component, 'markFormGroupTouched').and.callThrough();
    const navigateSpy = spyOn(router, 'navigate');

    component.registerForm = formBuilder.group({
      email: ['invalidemail', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', Validators.required],
      birthDate: ['', Validators.required],
      isAdmin: [false],
    });

    component.submitForm();

    expect(component.markFormGroupTouched).toHaveBeenCalled();
    expect(authService.registerUser).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('>>>>>>>>>>>>>>>>>> should navigate to home when form is valid', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate'); // Spy on router.navigate method

    component.registerForm = formBuilder.group({
      email: ['test@example.com', [Validators.required, Validators.email]],
      password: ['password', [Validators.required, Validators.minLength(6)]],
      username: ['testuser', Validators.required],
      birthDate: ['2000-01-01', Validators.required],
      isAdmin: [false],
    });

    component.submitForm();
    tick(); // Simulate asynchronous operations

    expect(authService.registerUser).toHaveBeenCalledWith(
      'test@example.com',
      'password',
      'testuser',
      '2000-01-01',
      false
    );
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
