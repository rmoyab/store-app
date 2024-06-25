import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';

describe('AuthService', () => {
  let authService: AuthService;
  let storageService: StorageService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: StorageService,
          useValue: jasmine.createSpyObj('StorageService', [
            'getItem',
            'setItem',
            'removeItem',
          ]),
        },
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
  });

  // it('should be created', () => {
  //   expect(authService).toBeTruthy();
  // });

  it('should register a user', () => {
    const email = 'test@example.com';
    const password = 'password';
    const username = 'testuser';
    const birthDate = '2000-01-01';

    spyOn(authService, 'loginUser'); // Spy on loginUser method

    authService.registerUser(email, password, username, birthDate);

    expect(storageService.setItem).toHaveBeenCalledWith(
      'users',
      jasmine.arrayContaining([{ email, password, username, birthDate }])
    );
    expect(authService.loginUser).toHaveBeenCalledWith(email, password);
  });

  it('should logout a user', () => {
    authService.logoutUser();

    expect(storageService.removeItem).toHaveBeenCalledWith('currentUser');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should update user profile', () => {
    const updatedProfile = { username: 'updateduser' };
    const currentUser = {
      email: 'test@example.com',
      password: 'password',
      username: 'testuser',
      birthDate: '2000-01-01',
    };
    spyOn(authService, 'getCurrentUser').and.returnValue(currentUser);

    authService.updateProfile(updatedProfile);

    expect(storageService.setItem).toHaveBeenCalledWith('currentUser', {
      ...currentUser,
      ...updatedProfile,
    });
  });
});
