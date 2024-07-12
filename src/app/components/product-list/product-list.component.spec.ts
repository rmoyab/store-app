import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../models/models';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockActivatedRoute: any;
  let productService: jasmine.SpyObj<ProductService>;
  let mockProducts: Product[];

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        queryParams: { id: 1 },
      },
      queryParams: of({ id: 1 }),
    };

    mockProducts = [
      {
        id: 1,
        name: 'Game 1',
        image: 'game1.jpg',
        description: 'Description of game 1',
        price: 20,
        discount: 0.1,
      },
      {
        id: 2,
        name: 'Game 2',
        image: 'game2.jpg',
        description: 'Description of game 2',
        price: 25,
        discount: 0.2,
      },
    ];

    const productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProductsByCategory',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CartService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ProductService, useValue: productServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

    productService = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;

    fixture.detectChanges();
  });

  it('>>>>>>>>>>>>>>>>>> should load products for a given category ID', fakeAsync(() => {
    component.categoryId = 1;

    productService.getProductsByCategory.and.returnValue(of(mockProducts));

    component.loadProducts();

    tick();

    fixture.detectChanges();

    expect(component.products).toEqual(mockProducts);
  }));

  it('>>>>>>>>>>>>>>>>>> should log an error if loading products fails', fakeAsync(() => {
    component.categoryId = 1;

    const mockError = 'Failed to fetch products';

    productService.getProductsByCategory.and.returnValue(throwError(mockError));

    spyOn(console, 'error');

    component.loadProducts();

    tick();

    fixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith(
      'Error fetching products:',
      mockError
    );

    console.log(component.products);

    expect(component.products).toEqual([]);
  }));

  it('>>>>>>>>>>>>>>>>>> should navigate to the product detail page', () => {
    const routerSpy = spyOn(component.router, 'navigate');

    component.goToGameDetail(1);

    expect(routerSpy).toHaveBeenCalledWith(['/product'], {
      queryParams: { id: 1 },
    });
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
