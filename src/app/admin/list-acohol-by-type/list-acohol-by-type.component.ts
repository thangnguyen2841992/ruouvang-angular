import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Origin} from '../../model/origin';
import {Accessory} from '../../model/accessory';
import {Type} from '../../model/type';
import {AuthService} from '../../service/auth.service';
import {OriginService} from '../../service/origin.service';
import {AccessoryService} from '../../service/accessory.service';
import {TypeService} from '../../service/type.service';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-list-acohol-by-type',
  templateUrl: './list-acohol-by-type.component.html',
  styleUrls: ['./list-acohol-by-type.component.css']
})
export class ListAcoholByTypeComponent implements OnInit {

  products: Product[] = [];
  productsAccessory: Product[] = [];
  offset = 0;
  searchForm: FormGroup = new FormGroup({
    keyword: new FormControl('', [Validators.required])
  });
  originList: Origin[] = [];
  accessoryList: Accessory[] = [];
  typeList: Type[] = [];
  productId: number;
  typeId: number;
  productname: string;
  totalPage = 0;
  currentPage = 1;

  constructor(private authService: AuthService,
              private originService: OriginService,
              private accessoryService: AccessoryService,
              private typeService: TypeService,
              private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.typeId = +paramMap.get('typeId');
    });
  }

  ngOnInit() {
    this.getAllOrigin();
    this.getAllAccessory();
    this.getAllType();
    this.getAllAcoholByTypeIdOfProject(this.typeId);
    this.getAllAcoholByTypeIdOfProjectNoPagination(this.typeId);
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

  deleteProduct(productId: number) {
    this.productService.deleteProductOfProject(productId).subscribe((data) => {
      alert('Xoá thành công!');
      this.getAllAcoholByTypeIdOfProject(this.typeId);
    });
  }

  getAllAcoholByTypeIdOfProject(typeId: number) {
    this.currentPage =  1;
    this.productService.getAllAcoholByTypeId(typeId, this.offset).subscribe((data) => {
      this.products = data;
    });
  }

  getAllAcoholByTypeIdOfProjectNoPagination(typeId: number) {
    this.productService.getAllAlcoholByTypeIdNoPaginationOfProject(typeId).subscribe((data) => {
      this.totalPage = Math.ceil(data.length / 10);
    });
  }

  getProductId(id: number, name: string) {
    this.productId = id;
    this.productname = name;
  }
  next() {
    this.currentPage = this.currentPage + 1;
    this.offset = this.offset + 10;
    this.getAllAcoholByTypeIdOfProject(this.typeId);
  }

  previous() {
    this.currentPage = this.currentPage - 1;
    this.offset = this.offset - 10;
    this.getAllAcoholByTypeIdOfProject(this.typeId);
  }
}
