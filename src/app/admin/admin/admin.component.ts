import {Component, OnInit} from '@angular/core';
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

  constructor(private authService: AuthService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getAllCategoryServiceOfProject();
  }

  get username() {
    return this.authService.currentUserValue.username;
  }

  getAllCategoryServiceOfProject() {
    this.categoryService.getAllCategoryOfProject().subscribe((data) => {
      this.categoryList = data;
    });
  }
}
