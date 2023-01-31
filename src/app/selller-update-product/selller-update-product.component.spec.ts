import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelllerUpdateProductComponent } from './selller-update-product.component';

describe('SelllerUpdateProductComponent', () => {
  let component: SelllerUpdateProductComponent;
  let fixture: ComponentFixture<SelllerUpdateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelllerUpdateProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelllerUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
