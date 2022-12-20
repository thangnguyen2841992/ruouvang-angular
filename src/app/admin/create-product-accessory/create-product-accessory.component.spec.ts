import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductAccessoryComponent } from './create-product-accessory.component';

describe('CreateProductAccessoryComponent', () => {
  let component: CreateProductAccessoryComponent;
  let fixture: ComponentFixture<CreateProductAccessoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductAccessoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductAccessoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
