import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {OriginService} from '../../service/origin.service';
import {AuthService} from '../../service/auth.service';
import {Product} from '../../model/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccessoryService} from '../../service/accessory.service';
import {Accessory} from '../../model/accessory';
import {Origin} from '../../model/origin';
import {Type} from '../../model/type';
import {TypeService} from '../../service/type.service';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {ProgressSpinnerMode, ThemePalette} from '@angular/material';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId = 0;
  originList: Origin[] = [];
  productForm: FormGroup;
  typeId = 0;
  originId = 0;
  imageLink = '';
  typeList: Type[] = [];
  imageFile: any;
  accessoryId = 0;
  accessoryList: Accessory[] = [];

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  constructor(private productService: ProductService,
              private router: Router,
              private activeRouted: ActivatedRoute,
              private originService: OriginService,
              private authService: AuthService,
              private typeService: TypeService,
              private accessoryService: AccessoryService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
  ) {
    this.activeRouted.paramMap.subscribe((paramMap: ParamMap) => {
      this.productId = +paramMap.get('id');
    });
  }

  ngOnInit() {
    this.findProductByID();
    this.getAllOriginOfProject();
    this.getAllTypeOfProject();
    this.getAllAccessory();
  }

  findProductByID() {
    this.productService.getProductById(this.productId).subscribe((data) => {
      this.productForm = new FormGroup({
        name: new FormControl(data.name, [Validators.required]),
        price: new FormControl(data.price, [Validators.required]),
        quantity: new FormControl(data.quantity, [Validators.required]),
        description: new FormControl(data.description, [Validators.required]),
      });
      this.originId = data.originId;
      this.typeId = data.typeId;
      this.imageLink = data.image;
    });
  }

  getAllOriginOfProject() {
    this.originService.getAllOriginOfProject().subscribe((data) => {
      this.originList = data;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.originList.length; i++) {
        this.originList[i].checked = false;
        if (this.originList[i].id === this.originId) {
          this.originList[i].checked = true;
        }
      }
    });
  }

  getAllTypeOfProject() {
    this.typeService.getAllTypeOfProject().subscribe((data) => {
      this.typeList = data;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.typeList.length; i++) {
        this.typeList[i].checked = false;
        if (this.typeList[i].id === this.typeId) {
          this.typeList[i].checked = true;
        }
      }
    });
  }
  getAllAccessory() {
    this.accessoryService.getAllAccessoryOfProject().subscribe((data) => {
      this.accessoryList = data;
    });
  }

  get username() {
    return this.authService.currentUserValue.username;
  }

  getOriginId($event) {
    this.originId = $event.target.value;
  }

  getTypeId($event) {
    this.typeId = $event.target.value;
  }

  getImage($event) {
    if ($event.target.files.length > 0) {
      this.imageFile = $event.target.files[0];
    }
    const imageFile = this.getCurrentDateTime() + this.imageFile;
    const fileRef = this.storage.ref(imageFile);
    this.storage.upload(imageFile, this.imageFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.imageLink = url;
        });
      })
    ).subscribe();
  }

  editProduct() {
    const productForm = {
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      quantity: this.productForm.value.quantity,
      image: this.imageLink,
      originId: this.originId,
      accessoryId: this.accessoryId,
      typeId: this.typeId
    };
    this.productService.editProductOfProject(this.productId, productForm).subscribe((data) => {
      alert('Sửa thông tin thành công!');
    });
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
