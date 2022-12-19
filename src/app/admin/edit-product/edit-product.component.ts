import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CategoryDTO} from '../../model/categoryDTO';
import {CategoryService} from '../../service/category.service';
import {AuthService} from '../../service/auth.service';
import {Product} from '../../model/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BrandService} from '../../service/brand.service';
import {Brand} from '../../model/brand';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId = 0;
  categoryList: CategoryDTO[] = [];
  productForm: FormGroup;
  brandID = 0;
  imageLink = '';
  brandList: Brand[] = [];
  categoryId = 0;

  constructor(private productService: ProductService,
              private router: Router,
              private activeRouted: ActivatedRoute,
              private categoryService: CategoryService,
              private authService: AuthService,
              private brandService: BrandService) {
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
    this.categoryService.getAllCategoryOfProject().subscribe((data) => {
      this.categoryList = data;
    });
  }

  get username() {
    return this.authService.currentUserValue.username;
  }

  getAllBrandOfCategory() {
    this.brandService.getAllBrandOfCategory(this.categoryId).subscribe((data) => {
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
