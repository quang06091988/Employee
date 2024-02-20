import { createAction, props } from '@ngrx/store';
import { Product } from '../product.model';

export const findAllProductsStart = createAction(
  '[Products] Find All Products Start'
);

export const findAllProductsSuccess = createAction(
  '[Products] Find All Products Success',
  props<{
    products: Product[];
  }>()
);

export const insertProductStart = createAction(
  '[Products] Insert Product Start',
  props<{ newProduct: Product }>()
);

export const insertProductSuccess = createAction(
  '[Products] Insert Product Success',
  props<{ productId: string; newProduct: Product }>()
);

export const updateProductStart = createAction(
  '[Products] Update Product Start',
  props<{ productId: string; newProduct: Product }>()
);

export const updateProductSuccess = createAction(
  '[Products] Update Product Success',
  props<{ productId: string; newProduct: Product }>()
);

export const deleteProductStart = createAction(
  '[Products] Delete Product Start',
  props<{ productId: string }>()
);

export const deleteProductSuccess = createAction(
  '[Products] Delete Product Success',
  props<{ productId: string }>()
);
