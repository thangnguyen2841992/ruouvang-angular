import {Component, OnInit} from '@angular/core';
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
  selector: 'app-list-alcohol-by-origin',
  templateUrl: './list-alcohol-by-origin.component.html',
  styleUrls: ['./list-alcohol-by-origin.component.css']
})
export class ListAlcoholByOriginComponent implements OnInit {

  products: Product[] = [];
  offset = 0;
  searchForm: FormGroup = new FormGroup({
    keyword: new FormControl('', [Validators.required])
  });
  originList: Origin[] = [];
  accessoryList: Accessory[] = [];
  typeList: Type[] = [];
  productId: number;
  originId: number;
  productname: string;
  totalPage = 0;
  currentPage = 1;
  originName = '';

  constructor(private authService: AuthService,
              private originService: OriginService,
              private accessoryService: AccessoryService,
              private typeService: TypeService,
              private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.originId = +paramMap.get('originId');
      this.originName = paramMap.get('originName');
    });
  }

  ngOnInit() {
    this.getAllOrigin();
    this.getAllAccessory();
    this.getAllType();
    this.getAllAcoholByOriginIdOfProject(this.originId);
    this.getAllAcoholByOriginIdOfProjectNoPagination(this.originId);
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
      this.getAllAcoholByOriginIdOfProject(this.originId);
    });
  }

  getAllAcoholByOriginIdOfProject(originId: number) {
    this.productService.getAllAcoholByOriginId(originId, this.offset).subscribe((data) => {
      this.products = data;
    });
  }

  getAllAcoholByOriginIdOfProjectNoPagination(originId: number) {
    this.productService.getAllAlcoholByOriginIdNoPaginationOfProject(originId).subscribe((data) => {
      this.totalPage = Math.ceil(data.length / 10);
      if (this.totalPage === 0) {
        this.currentPage = 0;
      } else {
        this.currentPage = 1;
      }
    });
  }

  getProductId(id: number, name: string) {
    this.productId = id;
    this.productname = name;
  }

  next() {
    this.currentPage = this.currentPage + 1;
    this.offset = this.offset + 10;
    this.getAllAcoholByOriginIdOfProject(this.originId);
  }

  previous() {
    this.currentPage = this.currentPage - 1;
    this.offset = this.offset - 10;
    this.getAllAcoholByOriginIdOfProject(this.originId);
  }

  getOriginId(id: number, name: string) {
    this.originId = id;
    this.originName = name;
    this.offset = 0;
    this.getAllAcoholByOriginIdOfProjectNoPagination(this.originId);
    this.getAllAcoholByOriginIdOfProject(this.originId);
  }
}
