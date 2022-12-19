import {Component, OnInit} from '@angular/core';
import {OriginService} from '../service/origin.service';
import {Accessory} from '../model/accessory';
import {AccessoryService} from '../service/accessory.service';
import {Origin} from '../model/origin';
import {AuthService} from '../service/auth.service';
import {Product} from '../model/product';
import {ProductService} from '../service/product.service';
import {TypeService} from '../service/type.service';
import {Observable} from 'rxjs';
import {Type} from '../model/type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  originList: Origin[] = [];
  accessoryList: Accessory[] = [];
  typeList: Type[] = [];
  isShowAllBrand = false;
  category: Origin = {};
  productList3: Product[] = [];
  productList4: Product[] = [];
  offset3 = 0;
  offset1and2 = 0;

  constructor(private originService: OriginService,
              private accessoryService: AccessoryService,
              private typeService: TypeService,
              private authService: AuthService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.getAllOrigin();
    this.showAllAccessory();
    this.showAllType();
    this.getAllProductCategory3();
    this.getAllProductCategory1and2();
  }

  getAllOrigin() {
    this.originService.getAllOriginOfProject().subscribe((data) => {
      this.originList = data;
    });
  }

  getAllProductCategory3() {
    this.productService.getAllProductCategory3OfProject(this.offset3).subscribe((data) => {
      this.productList3 = data;
    });
  }

  getAllProductCategory1and2() {
    this.productService.getAllProductCategory1and2OfProject(this.offset1and2).subscribe((data) => {
      this.productList4 = data;
    });
  }

  showAllAccessory() {
    this.accessoryService.getAllAccessoryOfCategory().subscribe((data) => {
      this.accessoryList = data;
    });
  }

  showAllType() {
    this.typeService.getAllTypeOfProject().subscribe((data) => {
      this.typeList = data;
    });
  }

  showSideBar() {
    this.isShowAllBrand = !this.isShowAllBrand;
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

  get username() {
    return this.authService.currentUserValue.username;
  }
}
