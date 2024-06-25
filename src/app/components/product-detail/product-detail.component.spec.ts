import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from './../../services/product/product.service';
import { of, throwError } from 'rxjs';
import { Product } from '../../models/models';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productService: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent], // Use provideHttpClientTestingModule() instead
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        RouterModule.forRoot([]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController); // Inject HttpTestingController
    fixture.detectChanges();
  });

  // it('should load product when productId is provided', fakeAsync(() => {
  //   const mockProduct: Product = {
  //     id: 1,
  //     name: 'Test Product',
  //     image: 'test.jpg',
  //     description: 'Test Description',
  //     price: 10,
  //     discount: 0.3,
  //   };
  //   component.productId = 1;

  //   spyOn(productService, 'getProductById').and.returnValue(of(mockProduct));

  //   component.loadProduct();
  //   tick();

  //   expect(component.product).toEqual(mockProduct);

  //   // Verify HTTP request
  //   const req = httpTestingController.expectOne('api/products/1'); // Replace with your actual API endpoint
  //   expect(req.request.method).toBe('GET');
  //   req.flush(mockProduct); // Simulate successful response
  // }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
