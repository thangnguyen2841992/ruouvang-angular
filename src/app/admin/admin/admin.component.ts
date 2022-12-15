import { Component, OnInit } from '@angular/core';
import {CategoryDTO} from '../../model/categoryDTO';
import {Brand} from '../../model/brand';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {BrandService} from '../../service/brand.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  categoryList: CategoryDTO[] = [];
  brandList: Brand[] = [];
  isShowAllBrand = false;
  category: Category = {};

  constructor(private categoryService: CategoryService,
              private brandService: BrandService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAllCategoryOfProject().subscribe((data) => {
      this.categoryList = data;
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
