import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlcoholByTypeComponent } from './list-alcohol-by-type.component';

describe('ListAlcoholByTypeComponent', () => {
  let component: ListAlcoholByTypeComponent;
  let fixture: ComponentFixture<ListAlcoholByTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAlcoholByTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAlcoholByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
