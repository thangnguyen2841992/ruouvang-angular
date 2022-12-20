import {Component, OnInit} from '@angular/core';
import {Accessory} from '../../model/accessory';
import {Origin} from '../../model/origin';
import {OriginService} from '../../service/origin.service';
import {AccessoryService} from '../../service/accessory.service';
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
    this.getAllAlcohol();
  }

  get username() {
    return this.authService.currentUserValue.username;
  }


  getAllAlcohol() {
    this.productService.getAllAlcoholOfProject(this.offset).subscribe((data) => {
      this.products = data;
    });
  }
}
