import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenditaComponent } from './vendita.component';

describe('VenditaComponent', () => {
  let component: VenditaComponent;
  let fixture: ComponentFixture<VenditaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenditaComponent]
    });
    fixture = TestBed.createComponent(VenditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
