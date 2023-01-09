import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlcoholByTypeRealComponent } from './list-alcohol-by-type-real.component';

describe('ListAlcoholByTypeRealComponent', () => {
  let component: ListAlcoholByTypeRealComponent;
  let fixture: ComponentFixture<ListAlcoholByTypeRealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAlcoholByTypeRealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAlcoholByTypeRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
