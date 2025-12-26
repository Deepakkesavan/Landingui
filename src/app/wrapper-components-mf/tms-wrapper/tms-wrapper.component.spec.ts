import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmsWrapperComponent } from './tms-wrapper.component';

describe('TmsWrapperComponent', () => {
  let component: TmsWrapperComponent;
  let fixture: ComponentFixture<TmsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TmsWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TmsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
