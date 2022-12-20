import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccessoryComponent } from './list-accessory.component';

describe('ListAccessoryComponent', () => {
  let component: ListAccessoryComponent;
  let fixture: ComponentFixture<ListAccessoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAccessoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAccessoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
