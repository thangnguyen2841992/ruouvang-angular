import { Component, OnInit } from '@angular/core';
import {Origin} from '../../model/origin';
import {OriginDto} from '../../model/origin-dto';
import {Accessory} from '../../model/accessory';
import {AccessoryDto} from '../../model/accessory-dto';
import {Type} from '../../model/type';
import {Product} from '../../model/product';
import {Invoice} from '../../model/invoice';
import {OriginService} from '../../service/origin.service';
import {AccessoryService} from '../../service/accessory.service';
import {TypeService} from '../../service/type.service';
import {AuthService} from '../../service/auth.service';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CartService} from '../../service/cart/cart.service';

@Component({
  selector: 'app-list-alcohol-by-type-real',
  templateUrl: './list-alcohol-by-type-real.component.html',
  styleUrls: ['./list-alcohol-by-type-real.component.css']
})
export class ListAlcoholByTypeRealComponent implements OnInit {

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
  totalPage = 0;
  currentPage = 1;
  products: Product[] = [];
  offset = 0;
  typeId: number;
  typeName: string;

  constructor(private originService: OriginService,
              private accessoryService: AccessoryService,
              private typeService: TypeService,
              private authService: AuthService,
              private productService: ProductService,
              private activeRouter: ActivatedRoute,
              private cartService: CartService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.getTypeId();
    this.getAllOrigin();
    this.getAllOriginDTO();
    this.showAllAccessory();
    this.showAllAccessoryDTO();
    this.showAllType();
    this.checkLogin();
    this.getProductID();
    this.findProductById();
    this.getInvoiceOfUser();
    this.getAllAcoholByTypeIdOfProject();
    this.getAllAcoholByTypeIdOfProjectNoPagination();
  }

  getTypeId() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.typeId = +paramMap.get('typeId');
      this.typeName = paramMap.get('typeName');
    });
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

  getAllAcoholByTypeIdOfProject() {
    this.productService.getAllAcoholByTypeId(this.typeId, this.offset).subscribe((data) => {
      this.products = data;
    });
  }

  getAllAcoholByTypeIdOfProjectNoPagination() {
    this.productService.getAllAlcoholByTypeIdNoPaginationOfProject(this.typeId).subscribe((data) => {
      this.totalPage = Math.ceil(data.length / 10);
      if (this.totalPage === 0) {
        this.currentPage = 0;
      } else {
        this.currentPage = 1;
      }
    });

  }

  reloadComponent(typeId, typeName) {
    const currentUrl = `/type/${typeId}/${typeName}`;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
