import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockUserService: jasmine.SpyObj<AuthService>;

  const mockActivatedRoute = {
    snapshot: { queryParams: { id: 1 } },
  };

  beforeEach(async () => {
    const mockUser = {
      id: 1,
      username: 'test',
      email: 'user@mail.com',
      password: '123456',
      birthDate: '2021-01-01',
      isAdmin: false,
    };

    mockUserService = jasmine.createSpyObj('AuthService', ['getCurrentUser']);
    mockUserService.getCurrentUser.and.returnValue(mockUser);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: AuthService, useValue: mockUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
