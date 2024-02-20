import { createReducer, on } from '@ngrx/store';
import { Product } from '../product.model';

import * as ProductsActions from './products.actions';

export interface State {
  products: Product[];
}

const initialState: State = {
  products: [],
};

export const authReducer = createReducer(
  initialState,
  on(ProductsActions.findAllProductsSuccess, (state, { products }) => ({
    ...state,
    products: products,
  })),
  on(
    ProductsActions.insertProductSuccess,
    (state, { productId, newProduct }) => ({
      ...state,
      products: insertProduct(state, productId, newProduct),
    })
  ),
  on(
    ProductsActions.updateProductSuccess,
    (state, { productId, newProduct }) => ({
      ...state,
      products: updateProduct(state, productId, newProduct),
    })
  ),
  on(ProductsActions.deleteProductSuccess, (state, { productId }) => ({
    ...state,
    products: deleteProduct(state, productId),
  }))
);

const insertProduct = (state: State, productId, newProduct: Product) => {
  const product = new Product(
    newProduct.name,
    newProduct.unitOfRetail,
    newProduct.priceOfRetail,
    newProduct.imagePath,
    newProduct.providers,
    productId
  );

  let products = [...state.products];

  products.push(product);

  return products;
};

const updateProduct = (state: State, productId, newProduct: Product) => {
  const product = new Product(
    newProduct.name,
    newProduct.unitOfRetail,
    newProduct.priceOfRetail,
    newProduct.imagePath,
    newProduct.providers,
    productId
  );

  let products = [...state.products];
  const index = products.findIndex((product) => product.id === productId);

  products[index] = product;

  return products;
};

const deleteProduct = (state, productId) => {
  let products = [...state.products];
  const index = products.findIndex((product) => product.id === productId);

  products.splice(index, 1);

  return products;
};
