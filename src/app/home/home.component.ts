import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../service/category.service';
import {Brand} from '../model/brand';
import {BrandService} from '../service/brand.service';
import {CategoryDTO} from '../model/categoryDTO';
import {Category} from '../model/category';
import {AuthService} from '../service/auth.service';

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
