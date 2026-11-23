
import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  HttpClient
} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController
} from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { Product } from '../models/product';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load products', () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        title: 'Test Product',
        description: 'Test description',
        price: 100,
        category: 'electronics',
        image: 'test.jpg'
      }
    ];

    service.list().subscribe(products => {
      expect(products.length).toBe(1);
      expect(products[0].title).toBe('Test Product');
    });

    const request = httpMock.expectOne(
      'https://fakestoreapi.com/products'
    );

    expect(request.request.method).toBe('GET');

    request.flush(mockProducts);
  });
});
