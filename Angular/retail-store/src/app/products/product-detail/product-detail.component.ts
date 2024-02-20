import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Product } from '../product.model';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as ProductsSelectors from '../store/products.selectors';
import * as ProductsActions from '../store/products.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product;
  productsSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productsSubscription = this.store
        .select(ProductsSelectors.products)
        .subscribe((products: Product[]) => {
          this.product = products.find(
            (product) => product.id === params['id']
          );
        });
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  onEditProduct() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteProduct() {
    this.store.dispatch(
      ProductsActions.deleteProductStart({ productId: this.product.id })
    );
  }
}
