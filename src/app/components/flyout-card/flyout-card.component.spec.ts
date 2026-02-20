import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyoutCardComponent } from './flyout-card.component';

describe('FlyoutCardComponent', () => {
  let component: FlyoutCardComponent;
  let fixture: ComponentFixture<FlyoutCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyoutCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlyoutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
