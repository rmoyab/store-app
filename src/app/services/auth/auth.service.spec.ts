import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../user/user.service';
import { User } from '../../models/models';
import { of } from 'rxjs';
import { id } from 'date-fns/locale';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: jasmine.SpyObj<UserService>;
  let storageService: jasmine.SpyObj<StorageService>;
  let router: Router;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', [
      'getUsers',
      'addUser',
    ]);
    const storageServiceSpy = jasmine.createSpyObj('StorageService', [
      'getItem',
      'setItem',
      'removeItem',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    storageService = TestBed.inject(
      StorageService
    ) as jasmine.SpyObj<StorageService>;
    router = TestBed.inject(Router);
  });

  it('>>>>>>>>>>>>>>>>>> should register', () => {
    const email = 'test@example.com';
    const password = 'password';
    const username = 'testuser';
    const birthDate = '2000-01-01';
    const isAdmin = false;

    userService.getUsers.and.returnValue(of([]));
    userService.addUser.and.returnValue(of(null));

    authService.registerUser(email, password, username, birthDate, isAdmin);

    expect(userService.getUsers).toHaveBeenCalled();
    expect(userService.addUser).toHaveBeenCalled();
  });

  it('>>>>>>>>>>>>>>>>>> should login a user', () => {
    const email = 'test@example.com';
    const password = 'password';

    spyOn(authService, 'loginUser').and.returnValue(true);

    const loggedIn = authService.loginUser(email, password);

    expect(authService.loginUser).toHaveBeenCalledWith(email, password);
    expect(loggedIn).toBe(true);
  });

  it('>>>>>>>>>>>>>>>>>> should logout a user', () => {
    authService.logoutUser();

    expect(storageService.removeItem).toHaveBeenCalledWith('currentUser');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  // it('should be created', () => {
  //   expect(authService).toBeTruthy();
  // });
});
