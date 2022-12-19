import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {OriginService} from '../../service/origin.service';
import {AuthService} from '../../service/auth.service';
import {Product} from '../../model/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccessoryService} from '../../service/accessory.service';
import {Accessory} from '../../model/accessory';
import {Origin} from '../../model/origin';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId = 0;
  categoryList: Origin[] = [];
  productForm: FormGroup;
  brandID = 0;
  imageLink = '';
  brandList: Accessory[] = [];
  categoryId = 0;

  constructor(private productService: ProductService,
              private router: Router,
              private activeRouted: ActivatedRoute,
              private categoryService: OriginService,
              private authService: AuthService,
              private brandService: AccessoryService) {
    this.activeRouted.paramMap.subscribe((paramMap: ParamMap) => {
      this.productId = +paramMap.get('id');
    });
    this.findProductByID();
  }

  ngOnInit() {
    this.getAllCategoryServiceOfProject();
  }

  findProductByID() {
    this.productService.getProductById(this.productId).subscribe((data) => {
      this.productForm = new FormGroup({
        name: new FormControl(data.name, [Validators.required]),
        price: new FormControl(data.price, [Validators.required]),
        quantity: new FormControl(data.quantity, [Validators.required]),
        description: new FormControl(data.description, [Validators.required]),
        categoryId: new FormControl(data.categoryId, [Validators.required]),
      });
      this.categoryId = data.categoryId;
      this.getAllBrandOfCategory();

      console.log(this.categoryId);
      this.brandID = data.brandId;
      this.imageLink = data.image;
    });
  }

  getAllCategoryServiceOfProject() {
    this.categoryService.getAllOriginOfProject().subscribe((data) => {
      this.categoryList = data;
    });
  }

  get username() {
    return this.authService.currentUserValue.username;
  }

  getAllBrandOfCategory() {
    this.brandService.getAllAccessoryOfCategory().subscribe((data) => {
      this.brandList = data;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.brandList.length; i++) {
        this.brandList[i].checked = false;
        if (this.brandList[i].id === this.brandID) {
          this.brandList[i].checked = true;
        }
      }
    });
  }

  changeCategoryID($event) {
    this.categoryId = $event.target.value;
    this.getAllBrandOfCategory();
  }

  getBrandId($event) {
    this.brandID = $event.target.value;
  }
}
