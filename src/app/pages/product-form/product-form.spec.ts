import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ProductForm } from './product-form';
import { ProductsService } from '../../services/products.service';

describe('ProductForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductForm],
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
            }),
            create: () => of({}),
            update: () => of({})
          }
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductForm);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});