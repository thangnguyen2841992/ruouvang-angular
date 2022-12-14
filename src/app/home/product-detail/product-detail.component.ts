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
import {OriginDto} from '../../model/origin-dto';
import {AccessoryDto} from '../../model/accessory-dto';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  originList: Origin[] = [];
  originDTOList: OriginDto[] = [];
  accessoryList: Accessory[] = [];
  accessoryListDTO: AccessoryDto[] = [];
  typeList: Type[] = [];
  isShowAllBrand = false;
  category: Origin = {};
  isLogin: boolean;
  productId = 0;
  product: Product[] = [];
  quantity = 1;
  invoice: Invoice = {};
  cartId: number;
  productName: string;
  isDescription = true;
  isInfo = false;
  isStar = false;

  constructor(private originService: OriginService,
              private accessoryService: AccessoryService,
              private typeService: TypeService,
              private authService: AuthService,
              private productService: ProductService,
              private activeRouter: ActivatedRoute,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.getAllOrigin();
    this.getAllOriginDTO();
    this.showAllAccessory();
    this.showAllAccessoryDTO();
    this.showAllType();
    this.checkLogin();
    this.getProductID();
    this.findProductById();
    this.getInvoiceOfUser();
  }

  getProductID() {
    this.activeRouter.paramMap.subscribe((paramMap: ParamMap) => {
      this.productId = +paramMap.get('productId');
    });
  }

  findProductById() {
    this.productService.getProductByIdDTO1(this.productId).subscribe((data) => {
      this.product = data;
    });
  }

  getAllOrigin() {
    this.originService.getAllOriginOfProject().subscribe((data) => {
      this.originList = data;
    });
  }

  getAllOriginDTO() {
    this.originService.getAllOriginDTOOfProject().subscribe((data) => {
      this.originDTOList = data;
    });
  }

  showAllAccessory() {
    this.accessoryService.getAllAccessoryOfProject().subscribe((data) => {
      this.accessoryList = data;
    });
  }

  showAllAccessoryDTO() {
    this.accessoryService.getAllAccessoryDTOOfProject().subscribe((data) => {
      this.accessoryListDTO = data;
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

  addQuantity() {
    this.quantity = this.quantity + 1;
  }

  subQuantity() {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1;
    }
  }

  createNewCart() {
    if (!this.isLogin) {
      alert('B???n h??y ????ng nh???p ????? mua h??ng nh??!');
    } else {
      const cart = {
        quantity: this.quantity,
        productId: this.productId,
        userId: this.currentUserId,
      };
      this.cartService.createNewCart(cart).subscribe((data) => {
        alert('Th??m s???n ph???m v??o gi??? h??ng th??nh c??ng');
        this.getInvoiceOfUser();
      });
    }
  }

  deleteCart(cartID: number) {
    this.cartService.deleteCart(cartID).subscribe((data) => {
      alert('Xo?? s???n ph???m kh???i gi??? h??ng th??nh c??ng');
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

  showInfo() {
    this.isDescription = false;
    this.isInfo = true;
  }

  showDesc() {
    this.isDescription = true;
    this.isInfo = false;
  }
}
