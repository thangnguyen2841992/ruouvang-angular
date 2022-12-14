import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {OriginService} from '../../service/origin.service';
import {ProductService} from '../../service/product.service';
import {AccessoryService} from '../../service/accessory.service';
import {TypeService} from '../../service/type.service';
import {Origin} from '../../model/origin';
import {Accessory} from '../../model/accessory';
import {Type} from '../../model/type';

@Component({
  selector: 'app-list-accessory',
  templateUrl: './list-accessory.component.html',
  styleUrls: ['./list-accessory.component.css']
})
export class ListAccessoryComponent implements OnInit {

  products: Product[] = [];
  offset = 0;
  searchForm: FormGroup = new FormGroup({
    keyword: new FormControl('', [Validators.required])
  });
  originList: Origin[] = [];
  accessoryList: Accessory[] = [];
  typeList: Type[] = [];
  productId: number;
  productName: string;
  totalPage = 0;
  currentPage = 1;

  constructor(private authService: AuthService,
              private originService: OriginService,
              private accessoryService: AccessoryService,
              private typeService: TypeService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.getAllAccessoryOfProject();
    this.getAllOrigin();
    this.getAllAccessory();
    this.getAllType();
    this.getAllAccessoryNoPaginationOfProject();
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


  getAllAccessoryOfProject() {
    this.productService.getAllAccessoryOfProject(this.offset).subscribe((data) => {
      this.products = data;
    });
  }
  getAllAccessoryNoPaginationOfProject() {
    this.productService.getAllAccessoryNoPaginationOfProject().subscribe((data) => {
      this.totalPage = Math.ceil(data.length / 10);
    });
  }

  deleteProduct(productId: number) {
    this.productService.deleteProductOfProject(productId).subscribe((data) => {
      alert('Xo?? th??nh c??ng!');
      this.getAllAccessoryOfProject();
    });
  }

  getProductId(id: number, name: string) {
    this.productId = id;
    this.productName = name;
  }
  next() {
    this.currentPage = this.currentPage + 1;
    this.offset = this.offset + 10;
    this.getAllAccessoryOfProject();
  }

  previous() {
    this.currentPage = this.currentPage - 1;
    this.offset = this.offset - 10;
    this.getAllAccessoryOfProject();
  }
}
