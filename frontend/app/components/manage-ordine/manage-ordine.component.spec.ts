import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrdineComponent } from './manage-ordine.component';

describe('ManageOrdineComponent', () => {
  let component: ManageOrdineComponent;
  let fixture: ComponentFixture<ManageOrdineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageOrdineComponent]
    });
    fixture = TestBed.createComponent(ManageOrdineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
