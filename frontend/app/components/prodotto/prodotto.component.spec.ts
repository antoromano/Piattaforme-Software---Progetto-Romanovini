import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdottoComponent } from './prodotto.component';

describe('ProdottoComponent', () => {
  let component: ProdottoComponent;
  let fixture: ComponentFixture<ProdottoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdottoComponent]
    });
    fixture = TestBed.createComponent(ProdottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
