
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProductDetails } from './product-details';
import { ProductsService } from '../../services/products.service';
import { of } from 'rxjs';

describe('ProductDetails', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetails],
      providers: [
        provideRouter([]),
        {
          provide: ProductsService,
          useValue: {
            get: () => of({
              id: 1,
              title: 'Test Product',
              description: 'Test description',
              price: 100,
              category: 'electronics',
              image: 'test.jpg'
            })
          }
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductDetails);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
