import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ProductsActions from './products.actions';
import { map, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Product, Provider } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';

interface InsertProductResponse {
  name: string;
}

interface UpdateProductResponse {
  name: string;
  unitOfRetail: string;
  priceOfRetail: number;
  imagePath?: string;
  providers?: Provider[];
}

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  findAllProductsStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.findAllProductsStart),
      switchMap(() => {
        const findAllProductsUrl = `${environment.firebaseRealtimeDatabase}/products.json`;
        return this.http.get(findAllProductsUrl).pipe(
          map<Object, Product[]>((findAllProductsResponse) => {
            if (!findAllProductsResponse) {
              return null;
            }
            return Object.keys(findAllProductsResponse).map((key) => {
              return {
                ...findAllProductsResponse[key],
                id: key,
              };
            });
          }),
          map((findAllProductsResponse) => {
            return ProductsActions.findAllProductsSuccess({
              products: findAllProductsResponse,
            });
          })
        );
      })
    )
  );

  insertProductStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.insertProductStart),
      switchMap(({ newProduct }) => {
        const insertUrl = `${environment.firebaseRealtimeDatabase}/products.json`;
        return this.http
          .post<InsertProductResponse>(insertUrl, newProduct)
          .pipe(
            map((insertProductResponse) => {
              return ProductsActions.insertProductSuccess({
                productId: insertProductResponse.name,
                newProduct: newProduct,
              });
            })
          );
      }),
      tap(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      })
    )
  );

  updateProductStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProductStart),
      switchMap(({ productId, newProduct }) => {
        const updateProductUrl = `${environment.firebaseRealtimeDatabase}/products/${productId}.json`;
        return this.http
          .put<UpdateProductResponse>(updateProductUrl, newProduct)
          .pipe(
            map(() => {
              return ProductsActions.updateProductSuccess({
                productId: productId,
                newProduct: newProduct,
              });
            }),
            tap(() => {
              this.router.navigate(['../'], { relativeTo: this.route });
            })
          );
      })
    )
  );

  deleteProductStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.deleteProductStart),
      switchMap(({ productId }) => {
        const deleteProductByIdUrl = `${environment.firebaseRealtimeDatabase}/products/${productId}.json`;
        return this.http.delete<null>(deleteProductByIdUrl).pipe(
          map(() => {
            return ProductsActions.deleteProductSuccess({
              productId: productId,
            });
          }),
          tap(() => {
            this.router.navigate(['/products']);
          })
        );
      })
    )
  );
}
