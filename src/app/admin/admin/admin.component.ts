import {Component, OnInit} from '@angular/core';
import {Accessory} from '../../model/accessory';
import {Origin} from '../../model/origin';
import {OriginService} from '../../service/origin.service';
import {AccessoryService} from '../../service/accessory.service';
import {AuthService} from '../../service/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {Type} from '../../model/type';
import {TypeService} from '../../service/type.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  offset = 0;
  searchForm: FormGroup = new FormGroup({
    keyword: new FormControl('', [Validators.required])
  });
  originList: Origin[] = [];
  accessoryList: Accessory[] = [];
  typeList: Type[] = [];
  productId: number;
  productname: string;

  constructor(private authService: AuthService,
              private originService: OriginService,
              private accessoryService: AccessoryService,
              private typeService: TypeService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.getAllAlcohol();
    this.getAllOrigin();
    this.getAllAccessory();
    this.getAllType();
  }

  getAllOrigin() {
    this.originService.getAllOriginOfProject().subscribe((data) => {
      this.originList = data;
    });
  }

  getAllAccessory() {
    this.accessoryService.getAllAccessoryOfProject().subscribe((data) => {
      this.accessoryList = data;
    });
  }

  getAllType() {
    this.typeService.getAllTypeOfProject().subscribe((data) => {
      this.typeList = data;
    });
  }

  get username() {
    return this.authService.currentUserValue.username;
  }


  getAllAlcohol() {
    this.productService.getAllAlcoholOfProject(this.offset).subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(productId: number) {
    this.productService.deleteProductOfProject(productId).subscribe((data) => {
      alert('Xoá thành công!');
      this.getAllAlcohol();
    });
  }

  getProductId(id: number, name: string) {
    this.productId = id;
    this.productname = name;
  }

  getAllAcoholByOriginIdOfProject(originId: number) {
    this.productService.getAllAcoholByOriginId(originId, this.offset).subscribe((data) => {
      this.products = data;
    });
  }

  getAllAcoholByTypeIdOfProject(typeId: number) {
    this.productService.getAllAcoholByTypeId(typeId, this.offset).subscribe((data) => {
      this.products = data;
    });
  }


}
