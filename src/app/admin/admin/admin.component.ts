import {Component, OnInit} from '@angular/core';
import {CategoryDTO} from '../../model/categoryDTO';
import {Brand} from '../../model/brand';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {BrandService} from '../../service/brand.service';
import {AuthService} from '../../service/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  categoryList: CategoryDTO[] = [];
  products: Product[] = [];
  offset = 0;
  searchForm: FormGroup = new FormGroup({
    keyword: new FormControl('', [Validators.required])
  });
  constructor(private authService: AuthService,
              private categoryService: CategoryService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.getAllCategoryServiceOfProject();
    this.getAllProduct();
  }

  get username() {
    return this.authService.currentUserValue.username;
  }

  getAllCategoryServiceOfProject() {
    this.categoryService.getAllCategoryOfProject().subscribe((data) => {
      this.categoryList = data;
    });
  }
  getAllProduct() {
    this.productService.getAllProductOfProject(this.offset).subscribe((data) =>{
      this.products = data;
    });
  }
}
