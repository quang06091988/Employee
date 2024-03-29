import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Product, Provider } from '../product.model';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as ProductsActions from '../store/products.actions';
import * as ProductsSelectors from '../store/products.selectors';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit, OnDestroy {
  editMode = false;
  product: Product;
  productsSubscription: Subscription;
  productForm: FormGroup;

  get providersControls() {
    return (this.productForm.get('providers') as FormArray).controls;
  }

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
          this.editMode = params['id'] != null;

          if (this.editMode) {
            this.product = products.find(
              (product) => product.id === params['id']
            );
          }

          this.initForm();
        });
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  onSubmit() {
    const name = this.productForm.value.name;
    const unitOfRetail = this.productForm.value.unitOfRetail;
    const priceOfRetail = this.productForm.value.priceOfRetail;
    const imagePath = this.productForm.value.imagePath;
    const providers: Provider[] = this.productForm.value.providers;
    const newProduct = new Product(
      name,
      unitOfRetail,
      priceOfRetail,
      imagePath,
      providers
    );

    if (!this.editMode) {
      this.store.dispatch(
        ProductsActions.insertProductStart({ newProduct: newProduct })
      );
    } else {
      this.store.dispatch(
        ProductsActions.updateProductStart({
          productId: this.product.id,
          newProduct: newProduct,
        })
      );
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteProvider(index: number) {
    (<FormArray>this.productForm.get('providers')).removeAt(index);
  }

  onAddProvider() {
    (<FormArray>this.productForm.get('providers')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        unitOfWholesale: new FormControl(null, Validators.required),
        priceOfWholesale: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  initForm() {
    let name: string;
    let unitOfRetail: string;
    let priceOfRetail: number;
    let imagePath: string =
      'https://png.pngtree.com/png-clipart/20230814/original/pngtree-empty-clear-plastic-cup-with-lid-picture-image_7939242.png';
    let providers: FormArray = new FormArray([]);

    if (this.editMode) {
      name = this.product.name;
      unitOfRetail = this.product.unitOfRetail;
      priceOfRetail = this.product.priceOfRetail;
      imagePath = this.product.imagePath;
      if (this.product.providers) {
        for (let provider of this.product.providers) {
          providers.push(
            new FormGroup({
              name: new FormControl(provider.name, Validators.required),
              unitOfWholesale: new FormControl(
                provider.unitOfWholesale,
                Validators.required
              ),
              priceOfWholesale: new FormControl(provider.priceOfWholesale, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.productForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      unitOfRetail: new FormControl(unitOfRetail, Validators.required),
      priceOfRetail: new FormControl(priceOfRetail, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      imagePath: new FormControl(imagePath),
      providers: providers,
    });
  }
}
