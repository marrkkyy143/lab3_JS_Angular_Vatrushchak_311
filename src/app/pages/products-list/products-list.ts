

  import {
    Component,
    OnInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy
  } from '@angular/core';
  import { RouterLink } from '@angular/router';

  import { ProductsService } from '../../services/products.service';
  import { Product } from '../../models/product';

  @Component({
    selector: 'app-products-list',
    imports: [RouterLink],
    templateUrl: './products-list.html',
    styleUrl: './products-list.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ProductsList implements OnInit {
    products: Product[] = [];
    categories: string[] = [];

    loading = true;
    error = '';

    selectedCategory = 'all';
    currentPage = 1;
    pageSize = 6;

    constructor(
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) {}

    ngOnInit(): void {
      this.productsService.list().subscribe({
        next: (data) => {
        console.log('Отримані товари:', data);
        console.log('Кількість товарів:', data.length);

        this.products = data;
        this.categories = [...new Set(data.map(product => product.category))];
        this.loading = false;
        this.cdr.detectChanges();
      },
        error: () => {
          this.error = 'Failed to load products.';
          this.loading = false;
        }
      });
    }

    get filteredProducts(): Product[] {
      if (this.selectedCategory === 'all') {
        return this.products;
      }

      return this.products.filter(
        product => product.category === this.selectedCategory
      );
    }

    get paginatedProducts(): Product[] {
      const start = (this.currentPage - 1) * this.pageSize;

      return this.filteredProducts.slice(start, start + this.pageSize);
    }

    get totalPages(): number {
      return Math.ceil(this.filteredProducts.length / this.pageSize);
    }

    onCategoryChange(event: Event): void {
      const select = event.target as HTMLSelectElement;

      this.selectedCategory = select.value;
      this.currentPage = 1;
    }

    changePage(page: number): void {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
    deleteProduct(id: number): void {
  const confirmed = confirm('Are you sure you want to delete this product?');

  if (!confirmed) {
    return;
  }

  this.productsService.delete(id).subscribe({
    next: () => {
      this.products = this.products.filter(
        product => product.id !== id
      );

      this.categories = [
        ...new Set(this.products.map(product => product.category))
      ];

      this.currentPage = Math.min(
        this.currentPage,
        Math.max(1, this.totalPages)
      );

      this.cdr.detectChanges();
    },
    error: () => {
      this.error = 'Failed to delete product.';
      this.cdr.detectChanges();
    }
  });
}
  }
