import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Product } from '../product.model';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as ProductsSelectors from '../store/products.selectors';
import * as ProductsActions from '../store/products.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  productsSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.productsSubscription = this.store
      .select(ProductsSelectors.products)
      .subscribe((products) => {
        this.products = products;
      });

    this.store.dispatch(ProductsActions.findAllProductsStart());
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  onNewProduct() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
