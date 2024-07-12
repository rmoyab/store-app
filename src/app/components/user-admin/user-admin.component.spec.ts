import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminComponent } from './user-admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StorageService } from '../../services/storage/storage.service';

describe('UserAdminComponent', () => {
  let component: UserAdminComponent;
  let fixture: ComponentFixture<UserAdminComponent>;

  const storageServiceMock = {
    getItem: () => ({ isAdmin: true }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: StorageService, useValue: storageServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
