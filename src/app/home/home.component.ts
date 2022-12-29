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
import {Invoice} from '../model/invoice';
import {CartService} from '../service/cart/cart.service';

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
  isLogin: boolean;
  invoice: Invoice = {};
  cartId: number;
  productName: string;

  constructor(private originService: OriginService,
              private accessoryService: AccessoryService,
              private typeService: TypeService,
              private authService: AuthService,
              private productService: ProductService,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.getAllOrigin();
    this.showAllAccessory();
    this.showAllType();
    this.getAllAccessory();
    this.getAllAlcohol();
    this.checkLogin();
    this.getInvoiceOfUser();

  }

  getAllOrigin() {
    this.originService.getAllOriginOfProject().subscribe((data) => {
      this.originList = data;
    });
  }


  getAllAccessory() {
    this.productService.getAllAccessoryOfProject(this.offset3).subscribe((data) => {
      this.productList3 = data;
    });
  }

  getAllAlcohol() {
    this.productService.getAllAlcoholOfProject(this.offset1and2).subscribe((data) => {
      this.productList4 = data;
    });
  }

  showAllAccessory() {
    this.accessoryService.getAllAccessoryOfProject().subscribe((data) => {
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

  checkLogin() {
    if (JSON.parse(sessionStorage.getItem('user')) != null) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  get username() {
    return this.authService.currentUserValue.username;
  }

  get currentUserId() {
    return this.authService.currentUserValue.id;
  }
  deleteCart(cartID: number) {
    this.cartService.deleteCart(cartID).subscribe((data) => {
      alert('Xoá sản phẩm khỏi giỏ hàng thành công');
      this.getInvoiceOfUser();
    });
  }

  getInvoiceOfUser() {
    this.cartService.getInvoiceOfUser(this.currentUserId).subscribe((data) => {
      this.invoice = data;
    });
  }
  getCartId(id: number, name: string) {
    this.cartId = id;
    this.productName = name;
  }
}
