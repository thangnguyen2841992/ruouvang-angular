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
import {TypeService} from '../../service/type.service';
import {Type} from '../../model/type';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  originList: Origin[] = [];
  accessoryList: Accessory[] = [];
  typeList: Type[] = [];
  originId = 1;
  accessoryId = 0;
  typeId = 1;
  imageFile: any;
  imageLink = '';

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService,
              private categoryService: OriginService,
              private brandService: AccessoryService,
              private productService: ProductService,
              private typeService: TypeService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.getAllOriginOfProject();
    this.getAllAccessoryOfProject();
    this.getAllTypeOfProject();
  }

  get username() {
    return this.authService.currentUserValue.username;
  }

  getAllOriginOfProject() {
    this.categoryService.getAllOriginOfProject().subscribe((data) => {
      this.originList = data;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.originList.length; i++) {
        if (this.originList[i].id === this.originId) {
          this.originList[i].checked = true;
        }
      }
    });
  }


  getAllAccessoryOfProject() {
    this.brandService.getAllAccessoryOfProject().subscribe((data) => {
      this.accessoryList = data;
    });
  }

  getAllTypeOfProject() {
    this.typeService.getAllTypeOfProject().subscribe((data) => {
      this.typeList = data;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.typeList.length; i++) {
        if (this.typeList[i].id === this.typeId) {
          this.typeList[i].checked = true;
        }
      }
    });
  }

  getTypeId($event) {
    this.typeId = $event.target.value;
  }

  getOriginId($event) {
    this.originId = $event.target.value;
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
            originId: this.originId,
            accessoryId: this.accessoryId,
            typeId: this.typeId
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
