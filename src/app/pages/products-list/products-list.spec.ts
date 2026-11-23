import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ProductsList } from './products-list';
import { ProductsService } from '../../services/products.service';

describe('ProductsList', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsList],
      providers: [
        provideRouter([]),
        {
          provide: ProductsService,
          useValue: {
            list: () => of([])
          }
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductsList);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});