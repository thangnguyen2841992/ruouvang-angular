import {Component, Inject, OnInit} from '@angular/core';
import {CategoryDTO} from '../../model/categoryDTO';
import {AuthService} from '../../service/auth.service';
import {CategoryService} from '../../service/category.service';
import {Brand} from '../../model/brand';
import {BrandService} from '../../service/brand.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../model/category';
import {ProductService} from '../../service/product.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  categoryList: CategoryDTO[] = [];
  categoryId = 1;
  brandId = 0;
  brandList: Brand[] = [];
  imageLink = '';
  categoryDefault: Category = {
    id: 1,
    name: ''
  };
  brandDefault: Brand = {
    id: 1,
    name: '',
    categoryId: 1
  };
  productForm: FormGroup = new FormGroup({
    categoryId: new FormControl(this.categoryDefault.id, [Validators.required]),
    brandId: new FormControl(this.brandDefault.id, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService,
              private categoryService: CategoryService,
              private brandService: BrandService,
              private productService: ProductService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
  ) {
  }

  ngOnInit() {
    this.getAllCategoryServiceOfProject();
    this.getAllBrandOfCategory();
  }

  get username() {
    return this.authService.currentUserValue.username;
  }

  getAllCategoryServiceOfProject() {
    this.categoryService.getAllCategoryOfProject().subscribe((data) => {
      this.categoryList = data;
    });
  }

  changeCategoryID($event) {
    this.categoryId = $event.target.value;
    this.getAllBrandOfCategory();
    this.productForm.patchValue({
      brandId: this.categoryId
    });
  }

  getAllBrandOfCategory() {
    this.brandService.getAllBrandOfCategory(this.categoryId).subscribe((data) => {
      this.brandList = data;
    });
  }


  getBrandId($event) {
    this.brandId = $event.target.value;
  }

  createNewProduct() {
    const imageFile = this.getCurrentDateTime() + this.productForm.get('image');
    const fileRef = this.storage.ref(imageFile);
    this.storage.upload(imageFile, this.productForm.get('image')).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.imageLink = url;
          const productForm = {
            name: this.productForm.value.name,
            price: this.productForm.value.price,
            quantity: this.productForm.value.quantity,
            description: this.productForm.value.description,
            image: this.imageLink,
            categoryId: this.productForm.value.categoryId,
            brandId: this.brandId
          };
          this.productService.createNewProductOfProject(productForm).subscribe(() => {
            alert('Tạo mới sản phẩm thành công!');
          });
        });
      })
    ).subscribe();
  }

  getImage($event) {
    if ($event.target.files > 0) {
      const file = $event.target.files[0];
      this.productForm.patchValue({
        image: file
      });
    }
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
