import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../service/category.service';
import {Brand} from '../model/brand';
import {BrandService} from '../service/brand.service';
import {CategoryDTO} from '../model/categoryDTO';
import {Category} from '../model/category';
import {AuthService} from '../service/auth.service';
import {Product} from '../model/product';
import {ProductService} from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categoryList: CategoryDTO[] = [];
  brandList: Brand[] = [];
  isShowAllBrand = false;
  category: Category = {};
  productList3: Product[] = [];
  productList4: Product[] = [];
  offset3 = 0;
  offset1and2 = 0;

  constructor(private categoryService: CategoryService,
              private brandService: BrandService,
              private authService: AuthService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.getAllCategory();
    this.getAllProductCategory3();
    this.getAllProductCategory1and2();
  }

  getAllCategory() {
    this.categoryService.getAllCategoryOfProject().subscribe((data) => {
      this.categoryList = data;
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

  showAllBrandOfCategory(categoryId: number) {
    this.categoryService.getCategoryById(categoryId).subscribe((data) => {
      this.category = data;
    });
    this.brandService.getAllBrandOfCategory(categoryId).subscribe((data) => {
      this.brandList = data;
    });
    this.isShowAllBrand = !this.isShowAllBrand;
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
