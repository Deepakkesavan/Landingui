import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardingWrapperComponent } from './offboarding-wrapper.component';

describe('OffboardingWrapperComponent', () => {
  let component: OffboardingWrapperComponent;
  let fixture: ComponentFixture<OffboardingWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffboardingWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffboardingWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
