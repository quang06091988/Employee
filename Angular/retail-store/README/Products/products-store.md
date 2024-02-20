Products Store
********************************************************* Products State
* interface
{
  products: Product[]
}
* initial
{
  products: []
}

********************************************************* Products Actions
* Action findAllProductsStart(): called at product-list.component.ts
- in effect: send http get request to backend
  if success:
    convert format of response's data to Product[]
    call action findAllProductsSuccess({products})

** Action findAllProductsSuccess({products: Product[]})
- in reducer: set state to {products: products}

* Action insertProductStart({newProduct: Product}): called at product-edit.component.ts
- in effect:
    send http post request to backend => if success: call action insertProductSuccess({productId, newProduct})
    navigate to '../'

** Action insertProductSuccess({productId: string, newProduct: Product})
- in reducer: set state to {products: add product}

* Action updateProductStart({productId: string, newProduct: Product}): called at product-edit.component.ts
- in effect:
    send http put request to backend => if success: call action updateProductSuccess({productId, newProduct})
    navigate to '../'

** Action updateProductSuccess({productId: string, newProduct: Product})
- in reducer: set state to {products: update product}

* Action deleteProductStart({productId: string}): called at product-detail.component.ts
in effect:
  http delete request to backend => if success: call action deleteProductSuccess({productId})
  navigate to '/products'

** Action deleteProductSuccess({productId: string})
- in reducer: set state to {products: delete product}

********************************************************* Products Selectors
* state => get state
* products => get {products}: used at product-list.component.ts, product-detail.component.ts, product-edit.component.ts
