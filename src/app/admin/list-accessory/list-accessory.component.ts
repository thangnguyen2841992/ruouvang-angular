import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {OriginService} from '../../service/origin.service';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-list-accessory',
  templateUrl: './list-accessory.component.html',
  styleUrls: ['./list-accessory.component.css']
})
export class ListAccessoryComponent implements OnInit {

  products: Product[] = [];
  offset = 0;
  searchForm: FormGroup = new FormGroup({
    keyword: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService,
              private categoryService: OriginService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.getAllAccessory();
  }

  get username() {
    return this.authService.currentUserValue.username;
  }


  getAllAccessory() {
    this.productService.getAllAccessoryOfProject(this.offset).subscribe((data) => {
      this.products = data;
    });
  }

}
