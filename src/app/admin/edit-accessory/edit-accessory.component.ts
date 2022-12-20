import {Component, OnInit} from '@angular/core';
import {Origin} from '../../model/origin';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Type} from '../../model/type';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {OriginService} from '../../service/origin.service';
import {AuthService} from '../../service/auth.service';
import {TypeService} from '../../service/type.service';
import {Accessory} from '../../model/accessory';
import {AccessoryService} from '../../service/accessory.service';

@Component({
  selector: 'app-edit-accessory',
  templateUrl: './edit-accessory.component.html',
  styleUrls: ['./edit-accessory.component.css']
})
export class EditAccessoryComponent implements OnInit {

  productId = 0;
  originList: Origin[] = [];
  productForm: FormGroup;
  typeId = 0;
  accessoryId = 0;
  originId = 0;
  imageLink = '';
  typeList: Type[] = [];
  imageFile: any;
  accessoryList: Accessory[] = [];

  constructor(private productService: ProductService,
              private router: Router,
              private activeRouted: ActivatedRoute,
              private originService: OriginService,
              private authService: AuthService,
              private typeService: TypeService,
              private accessoryService: AccessoryService) {
    this.activeRouted.paramMap.subscribe((paramMap: ParamMap) => {
      this.productId = +paramMap.get('id');
    });
  }

  ngOnInit() {
    this.findProductByID();
    this.getAllOriginOfProject();
    this.getAllTypeOfProject();
    this.getAllAccessoryOfProject();
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
      this.accessoryId = data.accessoryId;
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

  getAllAccessoryOfProject() {
    this.accessoryService.getAllAccessoryOfProject().subscribe((data) => {
      this.accessoryList = data;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.accessoryList.length; i++) {
        this.accessoryList[i].checked = false;
        if (this.accessoryList[i].id === this.accessoryId) {
          this.accessoryList[i].checked = true;
        }
      }
    });
  }

  get username() {
    return this.authService.currentUserValue.username;
  }

  getImage($event) {
    if ($event.target.files.length > 0) {
      this.imageFile = $event.target.files[0];
    }
  }

  getAccessoryId($event) {
    this.accessoryId = $event.target.value;
  }
}
