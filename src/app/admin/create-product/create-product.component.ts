import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {OriginService} from '../../service/origin.service';
import {Accessory} from '../../model/accessory';
import {AccessoryService} from '../../service/accessory.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Origin} from '../../model/origin';
import {ProductService} from '../../service/product.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  categoryList: Origin[] = [];
  categoryId = 1;
  brandId = 0;
  brandList: Accessory[] = [];
  imageFile: any;
  imageLink = '';
  categoryDefault: Origin = {
    id: 1,
    name: ''
  };
  productForm: FormGroup = new FormGroup({
    categoryId: new FormControl(this.categoryDefault.id, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService,
              private categoryService: OriginService,
              private brandService: AccessoryService,
              private productService: ProductService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router
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
    this.categoryService.getAllOriginOfProject().subscribe((data) => {
      this.categoryList = data;
    });
  }

  changeCategoryID($event) {
    this.categoryId = $event.target.value;
    this.getAllBrandOfCategory();
  }

  getAllBrandOfCategory() {
    this.brandService.getAllAccessoryOfCategory().subscribe((data) => {
      this.brandList = data;
    });
  }


  getBrandId($event) {
    this.brandId = $event.target.value;
  }
  getImage(event) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }
  createNewProduct() {
    const imageFile = this.getCurrentDateTime() + this.imageFile;
    const fileRef = this.storage.ref(imageFile);
    this.storage.upload(imageFile, this.imageFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.imageLink = url;
          const productForm = {
            name: this.productForm.value.name,
            price: this.productForm.value.price,
            quantity: this.productForm.value.quantity,
            image: this.imageLink,
            categoryId: this.productForm.value.categoryId,
            brandId: this.brandId
          };
          this.productService.createNewProductOfProject(productForm).subscribe(() => {
            alert('Tạo mới sản phẩm thành công!');
            this.productForm.reset();
          });
        });
      })
    ).subscribe();
  }


  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
