import {Component, Inject, OnInit} from '@angular/core';
import {Origin} from '../../model/origin';
import {Accessory} from '../../model/accessory';
import {Type} from '../../model/type';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {OriginService} from '../../service/origin.service';
import {AccessoryService} from '../../service/accessory.service';
import {ProductService} from '../../service/product.service';
import {TypeService} from '../../service/type.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-create-product-accessory',
  templateUrl: './create-product-accessory.component.html',
  styleUrls: ['./create-product-accessory.component.css']
})
export class CreateProductAccessoryComponent implements OnInit {

  originList: Origin[] = [];
  accessoryList: Accessory[] = [];
  typeList: Type[] = [];
  originId = 0;
  accessoryId = 1;
  typeId = 0;
  imageFile: any;
  imageLink = '';
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    content: new FormControl('',[Validators.required])

  });

  constructor(private authService: AuthService,
              private categoryService: OriginService,
              private brandService: AccessoryService,
              private productService: ProductService,
              private typeService: TypeService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router
  ) {
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
    });
  }


  getAllAccessoryOfProject() {
    this.brandService.getAllAccessoryOfProject().subscribe((data) => {
      this.accessoryList = data;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.accessoryList.length; i++) {
        if (this.accessoryList[i].id === this.accessoryId) {
          this.accessoryList[i].checked = true;
        }
      }
    });
  }

  getAllTypeOfProject() {
    this.typeService.getAllTypeOfProject().subscribe((data) => {
      this.typeList = data;
    });
  }


  getAccessoryId($event) {
    this.accessoryId = $event.target.value;
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
            typeId: this.typeId,
            content: this.productForm.value.content
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
