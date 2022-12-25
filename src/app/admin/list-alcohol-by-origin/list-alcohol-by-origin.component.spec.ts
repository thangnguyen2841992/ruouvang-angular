import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlcoholByOriginComponent } from './list-alcohol-by-origin.component';

describe('ListAlcoholByOriginComponent', () => {
  let component: ListAlcoholByOriginComponent;
  let fixture: ComponentFixture<ListAlcoholByOriginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAlcoholByOriginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAlcoholByOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
