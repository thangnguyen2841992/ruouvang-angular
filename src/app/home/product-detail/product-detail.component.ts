import {Component, OnInit} from '@angular/core';
import {Origin} from '../../model/origin';
import {Accessory} from '../../model/accessory';
import {Type} from '../../model/type';
import {Product} from '../../model/product';
import {OriginService} from '../../service/origin.service';
import {AccessoryService} from '../../service/accessory.service';
import {TypeService} from '../../service/type.service';
import {AuthService} from '../../service/auth.service';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CartService} from '../../service/cart/cart.service';
import {Invoice} from '../../model/invoice';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  originList: Origin[] = [];
  accessoryList: Accessory[] = [];
  typeList: Type[] = [];
  isShowAllBrand = false;
  category: Origin = {};
  isLogin: boolean;
  productId = 0;
  product: Product = {};
  quantity = 1;
  invoice: Invoice = {};

  constructor(private originService: OriginService,
              private accessoryService: AccessoryService,
              private typeService: TypeService,
              private authService: AuthService,
              private productService: ProductService,
              private activeRouter: ActivatedRoute,
              private cartService: CartService) {
    this.activeRouter.paramMap.subscribe((paramMap: ParamMap) => {
      this.productId = +paramMap.get('productId');
    });
  }

  ngOnInit() {
    this.getAllOrigin();
    this.showAllAccessory();
    this.showAllType();
    this.checkLogin();
    this.findProductById();
    this.getInvoiceOfUser();
  }

  getAllOrigin() {
    this.originService.getAllOriginOfProject().subscribe((data) => {
      this.originList = data;
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

  findProductById() {
    this.productService.getProductByIdDTO(this.productId).subscribe((data) => {
      this.product = data;
    });
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

  addQuantity() {
    this.quantity = this.quantity + 1;
  }

  subQuantity() {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1;
    }
  }

  createNewCart() {
    const cart = {
      quantity: this.quantity,
      productId: this.productId,
      userId: this.currentUserId,
    };
    this.cartService.createNewCart(cart).subscribe((data) => {
      alert('Thêm sản phẩm vào giỏ hàng thành công');
      this.getInvoiceOfUser();
    });
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
}
