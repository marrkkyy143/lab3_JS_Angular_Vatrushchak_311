import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss'
})
export class ProductForm implements OnInit {
  isEditMode = false;
  productId: number | null = null;
  error = '';

  productForm;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.productId = Number(id);

      this.productsService.get(this.productId).subscribe({
        next: (product) => {
          this.productForm.patchValue(product);
        },
        error: () => {
          this.error = 'Failed to load product.';
        }
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const product = this.productForm.getRawValue() as Product;

    if (this.isEditMode && this.productId !== null) {
      this.productsService.update(this.productId, product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: () => this.error = 'Failed to update product.'
      });
    } else {
      this.productsService.create(product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: () => this.error = 'Failed to create product.'
      });
    }
  }
}