import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Category } from '../../models/models';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('>>>>>>>>>>>>>>>>>> should return categories', () => {
    const mockCategories: Category[] = [
      { id: 1, name: 'Category 1', image: 'image1.jpg', games: [] },
      { id: 2, name: 'Category 2', image: 'image2.jpg', games: [] },
    ];

    service.getCategories().subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpTestingController.expectOne(service['dataUrl']);
    expect(req.request.method).toEqual('GET');
    req.flush({ data: { categories: mockCategories } });
  });

  it('>>>>>>>>>>>>>>>>>> should return products for a category', () => {
    const categoryId = 1;
    const mockCategory: Category = {
      id: categoryId,
      name: 'Category 1',
      image: 'image1.jpg',
      games: [
        {
          id: 1,
          name: 'Product 1',
          image: 'image1.jpg',
          description: 'Description 1',
          price: 10,
          discount: 0,
        },
        {
          id: 2,
          name: 'Product 2',
          image: 'image2.jpg',
          description: 'Description 2',
          price: 20,
          discount: 0,
        },
      ],
    };

    service.getProductsByCategory(categoryId).subscribe((products) => {
      expect(products).toEqual(mockCategory.games);
    });

    const req = httpTestingController.expectOne(service['dataUrl']);
    expect(req.request.method).toEqual('GET');
    req.flush({ data: { categories: [mockCategory] } });
  });

  it('>>>>>>>>>>>>>>>>>> should return a product by ID', () => {
    const productId = 1;
    const mockCategory: Category = {
      id: 1,
      name: 'Category 1',
      image: 'image1.jpg',
      games: [
        {
          id: productId,
          name: 'Product 1',
          image: 'image1.jpg',
          description: 'Description 1',
          price: 10,
          discount: 0,
        },
      ],
    };

    service.getProductById(productId).subscribe((product) => {
      expect(product).toEqual(mockCategory.games[0]);
    });

    const req = httpTestingController.expectOne(service['dataUrl']);
    expect(req.request.method).toEqual('GET');
    req.flush({ data: { categories: [mockCategory] } });
  });
});
