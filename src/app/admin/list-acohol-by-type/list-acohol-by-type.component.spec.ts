import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAcoholByTypeComponent } from './list-acohol-by-type.component';

describe('ListAcoholByTypeComponent', () => {
  let component: ListAcoholByTypeComponent;
  let fixture: ComponentFixture<ListAcoholByTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAcoholByTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAcoholByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
